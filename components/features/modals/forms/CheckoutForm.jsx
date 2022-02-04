import { toDecimal, getTotalPrice } from "~/utils";
import ALink from "~/components/features/custom-link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Card from "~/components/features/accordion/card";
import { toast } from "react-toastify";
import router from "next/router";
import { KHALTI_CREDS } from "~/config";
import Cookies from "js-cookie";
import KhaltiCheckout from "khalti-checkout-web";
import { POST_ORDER, POST_PROMO } from "~/api/queries";
import { BASE_URL } from "~/config";
export default function CheckoutForm(props) {
  const [promoServerError, setPromoServerError] = useState({ message: null });
  const [promoCodeValue, setPromoCodeValue] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [serverErrors, setServerErrors] = useState(null);
  const [paymentMthd, setPaymentMthd] = useState(null);
  const [pickFromShop, setPickFromShop] = useState(false); //change to null later if option is chosen
  const [shipCost, setShipCost] = useState(0);
  const empty_cart = () => {
    props.cartList.forEach((product) => {
      props.removeFromCart(product);
    });
  };
  // order form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  //promo
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm();

  const handle_promo = async (form_data) => {
    toast.info("Applying Promo Code", { autoClose: 1200 });
    try {
      const data = await POST_PROMO(promoCodeValue);
      if (data[1]) throw data[1];
      else if (data[0]) {
        toast.success("Promo Code Applied Successfully!", { autoClose: 1200 });
        setPromoDiscount(data[0].amount);
        setPromoServerError({ message: null });
      }
    } catch (error) {
      toast.error("Error", { autoClose: 1200 });
      setPromoDiscount(0);
      setPromoServerError({ message: error.message });
    } finally {
      setPromoCodeValue("");
    }
  };

  const handle_order = async (form_data) => {
    try {
      const response = await fetch(`${BASE_URL}/me/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Cookies.get("rameti_ec_access")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...props.user,
          phone_number: form_data.contact_number,
          address: form_data.delivery_address,
        }),
      });
      const data = await response.json();
      if (response.status === 400) {
        //validation error
        const error = new Error("Validation Error");
        error.status = 400;
        error.data = data;
        throw error;
      } else if (response.status !== 200) {
        const error = new Error("Unexpected Error");
        error.status = response.status;
        error.data = {
          message: ["Unexpected Error Occured"],
        };
        throw error;
      }
    } catch (error) {
      console.error(error);
      toast.error("Error While Saving Changes!", {
        autoClose: 1200,
      });
      let errors = [];
      Object.keys(error.data).forEach((key) => {
        error.data[key].forEach((error) => {
          errors.push(error);
        });
      });
      setServerErrors(errors);
    }

    let submit_data = {
      ...form_data,
      promo_code: promoCodeValue,
      pick_up_from_store: pickFromShop,
      sub_total: getTotalPrice(props.cartList, {
        promo_discount: promoDiscount,
      }),
      total: getTotalPrice(props.cartList, {
        promo_discount: promoDiscount,
        shipping_fee: 40,
        tax: getTotalPrice(props.cartList) * 0.13,
      }),
      order_status: "ORDERED",
      orders: props.cartList.map((item) => ({
        product: item.id,
        quantity: item.qty,
        color: item.color,
        size: item.size,
        order_status: "ORDERED",
      })),
    };
    delete submit_data["terms_condition"];
    delete submit_data["payment_method"];
    if (paymentMthd === "khalti") {
      const KHALTI_CONFIG = {
        publicKey: KHALTI_CREDS.KHALTI_PUBLIC_KEY,
        productIdentity: KHALTI_CREDS.KHALTI_PRODUCT_IDENTITY,
        productName: KHALTI_CREDS.PRODUCT_NAME,
        productUrl: KHALTI_CREDS.PRODUCT_URL,
        eventHandler: {
          onSuccess(payload) {
            const payment = {
              phone: payload.mobile,
              idx: payload.idx,
              token: payload.token,
              amount: payload.amount,
              fee_amount: 0,
            };
            submit_data = {
              ...submit_data,
              payment,
            };
            POST_ORDER(submit_data)
              .then((data) => {
                toast.success("Order Placed and Paid Successfully!");
                empty_cart();
                router.push("/pages/order");
              })
              .catch((error) => {
                toast.error("Error While Placing your Order!");
              });
          },
          onError(error) {
            // handle errors
            toast.error("THere Was an Error While Processing Payment", {
              autoClose: 1200,
            });
          },
          onClose() {},
        },
        paymentPreference: [
          "KHALTI",
          "EBANKING",
          "MOBILE_BANKING",
          "CONNECT_IPS",
          "SCT",
        ],
      };
      const Khalti_Checkout = new KhaltiCheckout(KHALTI_CONFIG);
      //TODO: replace 200*100 with total
      Khalti_Checkout.show({
        amount: 200 * 100,
      });
    } else if (paymentMthd === "cod") {
      POST_ORDER(submit_data)
        .then((data) => {
          toast.success("Order Placed Successfully!", { autoClose: 1200 });
          empty_cart([]);
          router.push("/pages/order");
        })
        .catch((err) => {
          toast.error("Order Placed Successfully!", { autoClose: 1200 });
        });
    }
  };

  return (
    <>
      {/* <div className="card accordion">
        <Card
          title="
            <div class='alert alert-light alert-primary alert-icon mb-4 pb-2 card-header'>
                <i class='fas fa-exclamation-circle'></i>
                <span class='text-body'>Have a coupon?</span>
                <a href='#' class='text-primary'>Click here to enter your code</a>
            </div>"
          type="parse"
        >
          {promoServerError.message && (
            <div className="alert alert-danger mb-2">
              Error: {promoServerError?.message}
            </div>
          )}
          <div className="alert-body mb-4 collapsed">
            <p>If you have a coupon code, please apply it below.</p>
            <form action="#" key="2" onSubmit={handleSubmit2(handle_promo)}>
              {errors2.promo_code && (
                <small className="error-msg">Coupon Code Cannot be Empty</small>
              )}
              <input
                type="text"
                {...register2("promo_code", {
                  required: true,
                })}
                className="input-text form-control text-grey ls-m mr-4"
                id="promo_code"
                placeholder="Promo code"
                value={promoCodeValue}
                onChange={(e) => setPromoCodeValue(e.target.value)}
              />

              <br />
              <button className="btn mt-2 btn-dark btn-rounded" type="submit">
                Apply Coupon
              </button>
            </form>
          </div>
        </Card>
      </div> */}
      <hr />
      <div className="row">
        <div className="col-6">
          {serverErrors && (
            <div className="alert alert-danger mb-2">
              Errors:
              {serverErrors.map((err) => (
                <li>{err}</li>
              ))}
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit(handle_order)}>
        <div className="row">
          <div className="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
            <h3 className="title title-simple text-left text-uppercase">
              Billing and Shipping Details
            </h3>
            <div className="row">
              <div className="col-xs-6">
                <div className="form-group">
                  <label htmlFor="delivery_address">
                    Enter Billing and Shipping Address
                  </label>
                  <input
                    type="text"
                    className="form-control mb-0"
                    placeholder="Address *"
                    id="delivery_address"
                    {...register("delivery_address", {
                      required: true,
                      value: props.user.address,
                    })}
                  />
                  {errors.delivery_address && (
                    <small className="error-msg mt-0">
                      Billing/Shipping Address is Required
                    </small>
                  )}
                </div>
              </div>
              <div className="col-xs-6">
                <div className="form-group mb-3">
                  <label htmlFor="contact_number">Contact Number</label>
                  <input
                    type="number"
                    className="form-control mb-0"
                    placeholder="Contact Number *"
                    id="contact_number"
                    {...register("contact_number", {
                      required: true,
                      value: props.user.phone_number,
                      validate: (phone_no) => {
                        if (isNaN(phone_no)) return false;
                        if (phone_no.length === 10) return phone_no[0] == 9;
                        else if (phone_no.length === 8) return phone_no[0] == 0;
                        return false;
                      },
                    })}
                  />
                  {errors.contact_number ? (
                    errors.contact_number.type === "validate" ? (
                      <small className="error-msg">
                        Contact Number Format Invalid
                      </small>
                    ) : (
                      <small className="error-msg">
                        Contact Number is Required
                      </small>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <label>Order Notes (Optional)</label>
            <textarea
              className="form-control pb-2 pt-2 mb-0"
              cols="30"
              rows="5"
              {...register("remarks")}
              name="remarks"
              placeholder="Notes about your order, e.g. special notes for delivery"
            ></textarea>
          </div>

          <aside className="col-lg-5 sticky-sidebar-wrapper">
            <div
              className="sticky-sidebar mt-1"
              data-sticky-options="{'bottom': 50}"
            >
              <div className="summary pt-5">
                <h3 className="title title-simple text-left text-uppercase">
                  Your Order
                </h3>
                <table className="order-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      {/* <th>Color</th> */}
                      <th>Size</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.cartList.map((item) => (
                      <tr
                        key={"checkout-" + item.name}
                        style={{ verticalAlign: "top" }}
                      >
                        <td className="product-name">
                          <ALink href={"/product/default/" + item.slug}>
                            {item.name}
                          </ALink>
                          <span className="product-quantity">
                            ×&nbsp;{item.qty}
                          </span>
                          <br />
                          <div className="d-flex" style={{ gap: "10px" }}>
                            <span className="font-weight-bold">Color </span>
                            <div
                              className="color-div ml-0 mr-0 pl-0 pr-0 no-hover"
                              style={{
                                backgroundColor: item.color,
                                width: "30px",
                                height: "30px",
                              }}
                            ></div>
                          </div>
                        </td>
                        <td className="product-total text-center">
                          {item.size}
                        </td>
                        <td className="product-total text-body">
                          NPR. {toDecimal(item.price * item.qty)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="2" className="product-name">
                        Promo Discount
                      </td>
                      <td className="product-total text-body">
                        NPR. {promoDiscount}
                      </td>
                    </tr>

                    <tr className="summary-subtotal">
                      <td>
                        <h4 className="summary-subtitle">Subtotal</h4>
                      </td>
                      <td
                        colSpan="3"
                        className="summary-subtotal-price pb-0 pt-0"
                      >
                        NPR.&nbsp;
                        {toDecimal(
                          getTotalPrice(props.cartList, {
                            promo_discount: promoDiscount,
                          })
                        )}
                      </td>
                    </tr>
                    {/* <tr className="sumnary-shipping shipping-row-last">
                      <td>
                        <h4 className="summary-subtitle">Recieving Method</h4>
                        <div className="custom-radio">
                          <input
                            type="radio"
                            value="shop_pickup"
                            id="shop_pickup"
                            {...register("pickup_method", {
                              required: true,
                            })}
                            onClick={(e) => {
                              setPickFromShop(true);
                              setShipCost(0);
                            }}
                          />
                          <label
                            className="form-control-label"
                            htmlFor="shop_pickup"
                          >
                            Pick Items from Shop
                          </label>
                        </div>
                        <div className="custom-radio">
                          <input
                            type="radio"
                            value="home_delivery"
                            id="home_delivery"
                            {...register("pickup_method", {
                              required: true,
                            })}
                            onClick={(e) => {
                              setPickFromShop(false);
                              setShipCost(40);
                            }}
                          />
                          <label htmlFor="home_delivery">Home Delivery</label>
                        </div>
                      </td>
                      <td colSpan="3">
                        <div>NPR. 0</div>
                        <div>NPR. 40</div>
                      </td>
                    </tr> */}

                    <tr className="summary-total">
                      <td className="pb-0">
                        <h4 className="summary-subtitle pb-0 mb-0">Total</h4>
                      </td>
                      <td colSpan="3" className=" pt-0 pb-0">
                        <p className="summary-total-price ls-s text-primary">
                          NPR.&nbsp;
                          {toDecimal(
                            getTotalPrice(props.cartList, {
                              promo_discount: promoDiscount,
                              shipping_fee: shipCost,
                            })
                          )}
                          {/* tax: getTotalPrice(props.cartList) * 0.13, */}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="payment accordion radio-type">
                  <h4 className="summary-subtitle ls-m pb-3">
                    Payment Methods
                  </h4>

                  <div className="checkbox-group">
                    <div className="card-header">
                      <div className="custom-radio">
                        <input
                          type="radio"
                          value="cod"
                          id="cod"
                          {...register("payment_method", { required: true })}
                          onClick={(e) => {
                            setPaymentMthd(e.target.value);
                          }}
                        />
                        <label htmlFor="cod">Cash on Delivery</label>
                      </div>
                      <div className="custom-radio">
                        <input
                          type="radio"
                          value="khalti"
                          id="khalti"
                          {...register("payment_method", { required: true })}
                          onClick={(e) => {
                            setPaymentMthd(e.target.value);
                          }}
                        />
                        <label className="form-control-label" htmlFor="khalti">
                          Pay With Khalti
                        </label>
                      </div>
                      {errors.payment_method !== undefined ? (
                        <small className="error-msg">
                          Select Atleast One Payment Method
                        </small>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-checkbox mt-4 mb-5">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    id="terms-condition"
                    name="terms-condition"
                    {...register("terms_condition", { required: true })}
                  />
                  <label
                    className="form-control-label"
                    htmlFor="terms-condition"
                  >
                    I have read and agree to the website{" "}
                    <ALink href="#">terms and conditions </ALink>*
                  </label>

                  {errors.terms_condition && (
                    <small className="error-msg">This Field is Required</small>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-dark btn-rounded btn-order"
                >
                  Place Order
                </button>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </>
  );
}
