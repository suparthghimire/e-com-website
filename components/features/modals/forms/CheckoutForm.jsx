import { toDecimal, getTotalPrice } from "~/utils";
import ALink from "~/components/features/custom-link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Card from "~/components/features/accordion/card";
import { BASE_URL } from "../../../../config";
import { toast } from "react-toastify";
import Cookie from "js-cookie";
import router from "next/router";
export default function CheckoutForm({ cartList }) {
  const [promoServerError, setPromoServerError] = useState({ message: null });
  const [promoCodeValue, setPromoCodeValue] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();
  const router = useRouter();
  const handle_promo = async (data) => {
    try {
      toast.info("Applying Promo Code", { autoClose: 1200 });
      const response = await fetch(`${BASE_URL}/promo/${promoCodeValue}/`);
      const data = await response.json();
      if (response.status == 404) {
        const error = new Error("Not Found");
        error.status = response.status;
        error.data = "Promo Code Not Valid";
        throw error;
      } else if (response.status !== 200) {
        const error = new Error("Unexpected Error");
        error.status = response.status;
        error.data = "Unexpected Error Occured";
        throw error;
      } else {
        toast.success("Coupon Code Applied", { autoClose: 1200 });
        console.log(data);
        setPromoDiscount(data.amount);
        setPromoServerError({ message: null });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error", { autoClose: 1200 });
      setPromoServerError({ message: error.data });
      console.error(error.data);
      setPromoDiscount(0);
    } finally {
      document.querySelectorAll("input").forEach((inp) => (inp.value = ""));
      document.querySelector("textarea").value = "";
    }
  };
  console.log(cartList);
  const handle_order = async (data) => {
    delete data["terms_condition"];

    const submit_data = {
      ...data,
      promo_code: promoCodeValue,
      sub_total: getTotalPrice(cartList, {
        promo_discount: promoDiscount,
      }),
      total: getTotalPrice(cartList, {
        promo_discount: promoDiscount,
        shipping_fee: 40,
        tax: getTotalPrice(cartList) * 0.13,
      }),
      order_status: "ORDERED",
      orders: cartList.map((item) => ({
        product: item.id,
        quantity: item.qty,
        color: item.color,
        size: item.size,
        order_status: "ORDERED",
      })),
    };

    const access = Cookie.get("rameti_ec_access");
    console.log(submit_data);
    try {
      toast.info("Placing Your Order", {
        autoClose: 1200,
      });
      const response = await fetch(`${BASE_URL}/order/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(submit_data),
      });
      const data = await response.json();
      if (response.status === 400) {
        const error = new Error("Validation Error");
        error.status = response.status;
        error.data = {
          message: "Validation Error",
          data: data,
        };
        throw error;
      } else if (response.status !== 200) {
        const error = new Error("Unexpected Error");
        error.status = response.status;
        error.data = {
          message: "Unable to Place Order",
          data: data,
        };
        throw error;
      } else {
        toast.success("Order Placed Successfully!");
        localStorage.removeItem("riode-cart");
        console.log(data);
        router.push("/pages/order");
      }
    } catch (error) {
      toast.error("Error", {
        autoClose: 1200,
      });
      console.error(error.data);
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
            {/* <div className="row">
              <div className="col-xs-6">
                <label>First Name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="first-name"
                  required
                />
              </div>
              <div className="col-xs-6">
                <label>Last Name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="last-name"
                  required
                />
              </div>
            </div>
            <label>Company Name (Optional)</label>
            <input
              type="text"
              className="form-control"
              name="company-name"
              required
            />
            <label>Country / Region *</label>
            <div className="select-box">
              <select name="country" className="form-control" defaultValue="us">
                <option value="us">United States (US)</option>
                <option value="uk"> United Kingdom</option>
                <option value="fr">France</option>
                <option value="aus">Austria</option>
              </select>
            </div>
            <label>Street Address *</label>
            <input
              type="text"
              className="form-control"
              name="address1"
              required
              placeholder="House number and street name"
            />
            <input
              type="text"
              className="form-control"
              name="address2"
              required
              placeholder="Apartment, suite, unit, etc. (optional)"
            />
            <div className="row">
              <div className="col-xs-6">
                <label>Town / City *</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  required
                />
              </div>
              <div className="col-xs-6">
                <label>State *</label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <label>ZIP *</label>
                <input
                  type="text"
                  className="form-control"
                  name="zip"
                  required
                />
              </div>
              <div className="col-xs-6">
                <label>Phone *</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  required
                />
              </div>
            </div>
            <label>Email Address *</label>
            <input
              type="text"
              className="form-control"
              name="email-address"
              required
            />

            <SlideToggle duration={300} collapsed>
              {({ onToggle, setCollapsibleElement }) => (
                <div className="form-checkbox mb-6">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    id="different-address"
                    name="different-address"
                    onChange={onToggle}
                  />
                  <label
                    className="form-control-label ls-s"
                    htmlFor="different-address"
                  >
                    Ship to a different address?
                  </label>

                  <div
                    ref={setCollapsibleElement}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="row pt-4">
                      <div className="col-xs-6">
                        <label>First Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="first-name"
                          required
                        />
                      </div>
                      <div className="col-xs-6">
                        <label>Last Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="last-name"
                          required
                        />
                      </div>
                    </div>
                    <label>Company Name (Optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="company-name"
                      required
                    />
                    <label>Country / Region *</label>
                    <div className="select-box">
                      <select
                        name="country"
                        className="form-control"
                        defaultValue="us"
                      >
                        <option value="us">United States (US)</option>
                        <option value="uk"> United Kingdom</option>
                        <option value="fr">France</option>
                        <option value="aus">Austria</option>
                      </select>
                    </div>
                    <label>Street Address *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address1"
                      required
                      placeholder="House number and street name"
                    />
                    <input
                      type="text"
                      className="form-control"
                      name="address2"
                      required
                      placeholder="Apartment, suite, unit, etc. (optional)"
                    />
                    <div className="row">
                      <div className="col-xs-6">
                        <label>Town / City *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          required
                        />
                      </div>
                      <div className="col-xs-6">
                        <label>State *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="state"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-6">
                        <label>ZIP *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="zip"
                          required
                        />
                      </div>
                      <div className="col-xs-6">
                        <label>Phone *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SlideToggle>

            <h2 className="title title-simple text-uppercase text-left mt-6">
              Additional Information
            </h2> */}
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
                    {cartList.map((item) => (
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
                          getTotalPrice(cartList, {
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
                            getTotalPrice(cartList, {
                              promo_discount: promoDiscount,
                              shipping_fee: 40,
                              tax: getTotalPrice(cartList) * 0.13,
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
                          id="payment_method"
                          name="payment_method"
                          className="custom-control-input"
                          defaultChecked
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="payment_method"
                        >
                          Cash on Delivery
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
