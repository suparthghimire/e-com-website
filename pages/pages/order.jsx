import { connect } from "react-redux";
import Helmet from "react-helmet";

import ALink from "~/components/features/custom-link";

import CustomLoader from "../../components/common/custom-loader";
import { GET_ALL_ORDERS } from "~/api/queries";
import { useQuery } from "react-query";
import Cookie from "js-cookie";
import Error404 from "../404";
import { useRouter } from "next/router";
function Order(props) {
  const router = useRouter();
  if (!props.loadingAuth && !props.auth) router.push("/pages/login");
  if (!props.loadingAuth && props.auth) {
    const access = Cookie.get("rameti_ec_access");
    const { data, status } = useQuery(
      ["all-orders", { access }],
      GET_ALL_ORDERS
    );
    console.log(data, status);
    if (status === "loading") return <CustomLoader type="Grid" />;
    if (status === "error") return <Error404 />;
    console.log(data);
    const toggleAccordian = (index) => {
      document
        .getElementById(`accordian-body-${index}`)
        .classList.toggle("accordian-body-show");
      document
        .getElementById(`accordian-toggle-btn-${index}`)
        .classList.toggle("accordian-toggle-btn-active");
    };

    const { cartList } = props;
    return (
      <main className="main order">
        <Helmet>
          <title>Riode React eCommerce Template | Order</title>
        </Helmet>

        <h1 className="d-none">Riode React eCommerce Template - Order</h1>

        <div className="page-content pt-7 pb-10 mb-10">
          <div className="step-by pr-4 pl-4">
            <h3 className="title title-simple title-step">
              <ALink href="/pages/cart">1. Shopping Cart</ALink>
            </h3>
            <h3 className="title title-simple title-step">
              <ALink href="/pages/checkout">2. Checkout</ALink>
            </h3>
            <h3 className="title title-simple title-step active">
              <ALink href="#">3. Order Complete</ALink>
            </h3>
          </div>
          <div className="container mt-8">
            <div className="order-message mr-auto ml-auto">
              <div className="icon-box d-inline-flex align-items-center">
                <div className="icon-box-icon mb-0">
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 50 50"
                    enableBackground="new 0 0 50 50"
                    xmlSpace="preserve"
                  >
                    <g>
                      <path
                        fill="none"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="bevel"
                        strokeMiterlimit="10"
                        d="
                            M33.3,3.9c-2.7-1.1-5.6-1.8-8.7-1.8c-12.3,0-22.4,10-22.4,22.4c0,12.3,10,22.4,22.4,22.4c12.3,0,22.4-10,22.4-22.4
                            c0-0.7,0-1.4-0.1-2.1"
                      ></path>
                      <polyline
                        fill="none"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="bevel"
                        strokeMiterlimit="10"
                        points=" 48,6.9 24.4,29.8 17.2,22.3"
                      ></polyline>
                    </g>
                  </svg>
                </div>
                <div className="icon-box-content text-left">
                  <h5 className="icon-box-title font-weight-bold lh-1 mb-1">
                    Thank You!
                  </h5>
                  <p className="lh-1 ls-m">Your order has been received</p>
                </div>
              </div>
            </div>

            <div className="order-results">
              {/* <div className="overview-item">
                <span>Order number:</span>
                <strong>4935</strong>
              </div> */}
              {/* <div className="overview-item">
                <span>Status:</span>
                <strong>Processing</strong>
              </div> */}
              {/* <div className="overview-item">
                <span>Date:</span>
                <strong>November 20, 2020</strong>
              </div> */}
              <div className="overview-item">
                <span>Email:</span>
                <strong>{props.user.email}</strong>
              </div>
              {/* <div className="overview-item">
                <span>Total:</span>
                <strong>${toDecimal(getTotalPrice(cartList))}</strong>
              </div> */}
            </div>
            <hr />
            <h2 className="title title-simple text-left pt-4 font-weight-bold text-uppercase">
              Order Details
            </h2>
            {data.count === 0 ? (
              <h5>Opps! Looks Like There Are No Orders To Show!</h5>
            ) : (
              <div className="order-details">
                <table className="order-details-table">
                  <thead>
                    <tr className="summary-subtotal">
                      <td>
                        <h3 className="summary-subtitle">Orders</h3>
                      </td>
                      <td colSpan="2"></td>
                    </tr>
                  </thead>
                  <tbody>
                    {data.results.map((item, index) => (
                      <tr key={"order-" + item.id}>
                        <td className="product-name w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <span className="font-weight-bold">
                                Order - {index + 1}:
                              </span>{" "}
                              {item.id}{" "}
                              {item.promo_code !== "" ? (
                                <p>Promo Code: {item.promo_code} Applied</p>
                              ) : (
                                ""
                              )}
                              <h6>Your order has been {item.order_status}</h6>
                            </div>
                            <div
                              className="d-flex align-items-center"
                              style={{ gap: "5px" }}
                            >
                              <button
                                className="accordian-toggle-btn"
                                id={"accordian-toggle-btn-" + index}
                                onClick={() => {
                                  toggleAccordian(index);
                                }}
                              >
                                <i class="fas fa-chevron-down"></i>
                              </button>
                            </div>
                          </div>
                          <div
                            className="accordian-body"
                            id={"accordian-body-" + index}
                          >
                            <span>
                              <div className="d-flex flex-wrap">
                                {item.orders.map((order, index) => {
                                  return (
                                    <ALink
                                      href={
                                        "/product/default/" + order.product.slug
                                      }
                                    >
                                      <div className="d-flex mr-5 flex-column align-items-center mt-1">
                                        <div className="order-img-container">
                                          <img
                                            src={
                                              order.product.product_image[0].url
                                            }
                                            alt={order.product.title}
                                          />
                                        </div>
                                        <div className="mt-2 text-center">
                                          {order.product.title}
                                          <br />
                                          Nrs. {order.product.display_price}
                                          <br />
                                          <i className="fas fa-times"></i>{" "}
                                          {order.quantity}
                                        </div>
                                      </div>
                                    </ALink>
                                  );
                                })}
                              </div>
                            </span>
                            <div className="mt-5 d-flex justify-content-between align-items-center summary-subtotal"></div>
                            <div className="d-flex justify-content-between align-items-center summary-subtotal">
                              <div>
                                <h4 className="summary-subtitle">Sub Total</h4>
                              </div>
                              <div className="summary-subtotal-price">
                                Nrs. {item.sub_total}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center summary-subtotal">
                              <div>
                                <h4 className="summary-subtitle">
                                  Grand Total <small>(After 13% Tax)</small>
                                </h4>
                              </div>
                              <div className="summary-subtotal-price">
                                Nrs. {item.total}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center summary-subtotal">
                              <div>
                                <h4 className="summary-subtitle">
                                  Delivery Address
                                </h4>
                              </div>
                              <div className="summary-subtotal-price">
                                {item.delivery_address}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center summary-subtotal">
                              <div>
                                <h4 className="summary-subtitle">
                                  Contact Number
                                </h4>
                              </div>
                              <div className="summary-subtotal-price">
                                {item.contact_number}
                              </div>
                            </div>
                            {item.order_status === "ORDERED" ? (
                              <div className="summary-subtotal">
                                <div>
                                  {item.order_status === "ORDERED" ? (
                                    <ALink
                                      href={"/pages/cancel-order/" + item.id}
                                    >
                                      <button className="btn mt-2 mb-2 btn-sm align-end">
                                        Cancel this Order
                                      </button>
                                    </ALink>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <ALink
              href="/shop"
              className="btn mt-2 btn-icon-left btn-dark btn-back btn-rounded btn-md mb-4"
            >
              <i className="d-icon-arrow-left"></i> Back to List
            </ALink>
          </div>
        </div>
      </main>
    );
  }
  return <CustomLoader type="Grid" />;
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
  };
}

export default connect(mapStateToProps)(Order);
