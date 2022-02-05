import { connect } from "react-redux";
import Helmet from "react-helmet";

import ALink from "~/components/features/custom-link";
import StepByStep from "~/components/common/step-by-step";
import OrderMessage from "~/components/common/order-message";

import CustomLoader from "../../components/common/custom-loader";
import { GET_ALL_ORDERS } from "~/api/queries";
import { useQuery } from "react-query";
import Cookie from "js-cookie";
import Error404 from "../404";
import { TITLE } from "~/config";
import { useRouter } from "next/router";
function Order(props) {
  const router = useRouter();
  const limit = "10000" && router.query.limit;
  const offset = "0" && router.query.offset;
  if (!props.loadingAuth && !props.auth) router.push("/pages/login");
  if (!props.loadingAuth && props.auth) {
    const access = Cookie.get("rameti_ec_access");
    const { data, status } = useQuery(
      ["all-orders", { access, limit, offset }],
      GET_ALL_ORDERS
    );
    if (status === "loading") return <CustomLoader type="Grid" />;
    if (status === "error") return <Error404 />;
    const toggleAccordian = (index) => {
      document
        .getElementById(`accordian-body-${index}`)
        .classList.toggle("accordian-body-show");
      document
        .getElementById(`accordian-toggle-btn-${index}`)
        .classList.toggle("accordian-toggle-btn-active");
    };
    const next_page_url = data && data.next ? new URL(data.next) : null;
    const next_offset = next_page_url
      ? next_page_url.searchParams.get("offset")
      : null;
    const next_limit = next_page_url
      ? next_page_url.searchParams.get("limit")
      : null;
    return (
      <main className="main order">
        <Helmet>
          <title>{TITLE} </title>
        </Helmet>
        <div className="page-content pt-7 pb-10 mb-10">
          <div className="container mt-8">
            <div className="d-flex justify-content-between">
              <h2 className="title title-simple text-left pt-4 font-weight-bold text-uppercase">
                Order Details
              </h2>
              <ul className="pagination">
                {data.previous && (
                  <li className="page-item">
                    <ALink
                      href={{
                        pathname: router.pathname,
                        query: {
                          limit: next_limit,
                          offset: (
                            parseInt(offset) - parseInt(limit)
                          ).toString(),
                        },
                      }}
                      scroll={false}
                    >
                      <button className="btn btn-sm btn-transparent hover-dark">
                        <i className="d-icon-arrow-left"></i>
                        {/* Previous */}
                      </button>
                    </ALink>
                  </li>
                )}

                {data.next && (
                  <li className="page-item">
                    <ALink
                      href={{
                        pathname: router.pathname,
                        query: {
                          limit: next_limit,
                          offset: next_offset,
                        },
                      }}
                      scroll={false}
                    >
                      <button className="btn btn-sm btn-transparent hover-dark">
                        {/* Next */}
                        <i className="d-icon-arrow-right"></i>
                      </button>
                    </ALink>
                  </li>
                )}
              </ul>
            </div>
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
                      <tr
                        key={"order-" + item.id}
                        className={index % 2 !== 0 ? "dark-bg" : "light-bg"}
                      >
                        <td className="product-name w-100 pl-2 pr-2">
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
                                <i className="fas fa-chevron-down"></i>
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
                                      key={index}
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
                                          NPR. {order.product.display_price}
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
                                NPR. {item.sub_total}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center summary-subtotal">
                              <div>
                                <h4 className="summary-subtitle">
                                  Grand Total
                                </h4>
                              </div>
                              <div className="summary-subtotal-price">
                                NPR. {item.total}
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
                                      <button className="btn mt-2 mb-2 btn-sm align-end red-btn">
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
