import { toDecimal, getTotalPrice } from "~/utils";
import ALink from "~/components/features/custom-link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Card from "~/components/features/accordion/card";
import { toast } from "react-toastify";
import router from "next/router";
import { KHALTI_CREDS } from "~/config";
import KhaltiCheckout from "khalti-checkout-web";
import { POST_ORDER, POST_PROMO } from "~/api/queries";
import { cartActions } from "~/store/cart";
export default function CheckoutForm(props) {
  const [promoServerError, setPromoServerError] = useState({ message: null });
  const [promoCodeValue, setPromoCodeValue] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const empty_cart = () => {
    cartActions.updateCart([]);
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
        console.log(data[0]);
        setPromoDiscount(data[0].amount);
        setPromoServerError({ message: null });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error", { autoClose: 1200 });
      setPromoDiscount(0);
      setPromoServerError({ message: error.message });
    } finally {
      setPromoCodeValue("");
    }
  };

  const handle_order = async (form_data) => {
    let submit_data = {
      ...form_data,
      promo_code: promoCodeValue,
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
    if (form_data["payment_method"] === "khalti") {
      const KHALTI_CONFIG = {
        publicKey: KHALTI_CREDS.KHALTI_PUBLIC_KEY,
        productIdentity: KHALTI_CREDS.KHALTI_PRODUCT_IDENTITY,
        productName: KHALTI_CREDS.PRODUCT_NAME,
        productUrl: KHALTI_CREDS.PRODUCT_URL,
        eventHandler: {
          onSuccess(payload) {
            console.log(payload);
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
                console.log(data);
                toast.success("Order Placed and Paid Successfully!");
                empty_cart();
                router.push("/pages/order");
              })
              .catch((error) => {
                toast.error("Error While Placing your Order!");
                console.error(error);
              });
          },
          onError(error) {
            // handle errors
            toast.error("THere Was an Error While Processing Payment", {
              autoClose: 1200,
            });
            console.log(error);
          },
          onClose() {
            console.log("widget is closing");
          },
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
    } else if (form_data["payment_method"] === "cod") {
      POST_ORDER(submit_data)
        .then((data) => {
          toast.success("Order Placed Successfully!", { autoClose: 1200 });
          empty_cart([]);
          router.push("/pages/order");
        })
        .catch((err) => {
          toast.error("Order Placed Successfully!", { autoClose: 1200 });
          console.error(err);
        });
    }
  };
  return (
    <>
      <div className="card accordion">
        <Card
          title="
            <div className='alert alert-light alert-primary alert-icon mb-4 pb-2 card-header'>
                <i className='fas fa-exclamation-circle'></i>
                <span className='text-body'>Have a coupon?</span>
                <a href='#' className='text-primary'>Click here to enter your code</a>
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
      </div>
      <hr />
      <form onSubmit={handleSubmit(handle_order)}>
        <div className="row">
          <div className="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
            <h3 className="title title-simple text-left text-uppercase">
              Billing and Shipping Details
            </h3>
            <div className="row">
              <div className="col-xs-6">
                <label htmlFor="delivery_address">
                  Enter Billing and Shipping Address
                </label>
                {errors.delivery_address && (
                  <small className="error-msg mt-0">
                    Billing/Shipping Address is Required
                  </small>
                )}
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address *"
                  id="delivery_address"
                  {...register("delivery_address", { required: true })}
                />
              </div>
              <div className="col-xs-6">
                <label htmlFor="contact_number">Contact Number</label>
                {errors.contact_number && (
                  <small className="error-msg mt-0">
                    Contact Number is Required
                  </small>
                )}

                <input
                  type="number"
                  className="form-control"
                  placeholder="Contact Number *"
                  id="contact_number"
                  {...register("contact_number", { required: true })}
                />
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
                      <th>Color</th>
                      <th>Size</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.cartList.map((item) => (
                      <tr key={"checkout-" + item.name}>
                        <td className="product-name">
                          {item.name}{" "}
                          <span className="product-quantity">
                            ×&nbsp;{item.qty}
                          </span>
                        </td>
                        <td className="product-total">{item.color}</td>
                        <td className="product-total">{item.size}</td>
                        <td className="product-total text-body">
                          Nrs. {toDecimal(item.price * item.qty)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="3" className="product-name">
                        Promo Discount
                      </td>
                      <td className="product-total text-body">
                        Nrs. {promoDiscount}
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
                        Nrs.&nbsp;
                        {toDecimal(
                          getTotalPrice(props.cartList, {
                            promo_discount: promoDiscount,
                          })
                        )}
                      </td>
                    </tr>
                    <tr className="sumnary-shipping shipping-row-last">
                      <td>
                        <h4 className="summary-subtitle">Calculate Shipping</h4>
                        <ul>
                          <li>
                            <div className="custom-radio">
                              <input
                                type="radio"
                                id="flat_rate"
                                name="shipping"
                                className="custom-control-input"
                                defaultChecked
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="flat_rate"
                              >
                                Flat rate
                              </label>
                            </div>
                          </li>

                          {/* <li>
                            <div className="custom-radio">
                              <input
                                type="radio"
                                id="free-shipping"
                                name="shipping"
                                className="custom-control-input"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="free-shipping"
                              >
                                Free shipping
                              </label>
                            </div>
                          </li> */}

                          {/* <li>
                            <div className="custom-radio">
                              <input
                                type="radio"
                                id="local_pickup"
                                name="shipping"
                                className="custom-control-input"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="local_pickup"
                              >
                                Local pickup
                              </label>
                            </div>
                          </li> */}
                        </ul>
                      </td>
                      <td colSpan="3">Nrs. 40</td>
                    </tr>
                    <tr className="summary-total">
                      <td className="pb-0">
                        <h4 className="summary-subtitle pb-0 mb-0">Total</h4>
                        <span className="font-italic">
                          After 13% Tax on Total (Without Shipping)
                        </span>
                      </td>
                      <td colSpan="3" className=" pt-0 pb-0">
                        <p className="summary-total-price ls-s text-primary">
                          Nrs.&nbsp;
                          {toDecimal(
                            getTotalPrice(props.cartList, {
                              promo_discount: promoDiscount,
                              shipping_fee: 40,
                              tax: getTotalPrice(props.cartList) * 0.13,
                            })
                          )}
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
                          {...register("payment_method")}
                          value="cod"
                          id="cod"
                        />
                        <label htmlFor="cod">Cash on Delivery</label>
                      </div>
                      <div className="custom-radio">
                        <input
                          type="radio"
                          {...register("payment_method")}
                          value="khalti"
                          id="khalti"
                        />
                        <label className="form-control-label" htmlFor="khalti">
                          Pay With Khalti
                        </label>
                      </div>
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
