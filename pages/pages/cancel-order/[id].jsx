import { useRouter } from "next/router";
import CustomLoader from "~/components/common/custom-loader";
import { GET_SINGLE_ORDER } from "~/api/queries";
import { useQuery } from "react-query";
import Cookie from "js-cookie";
import ALink from "~/components/features/custom-link";
import CancelForm from "~/components/features/modals/forms/CancelForm";
export default function OrderCancel(props) {
  const router = useRouter();

  if (!props.loadingAuth && !props.auth) router.push("/pages/login");
  if (!props.loadingAuth && props.auth) {
    const id = router.query.id;
    const access = Cookie.get("rameti_ec_access");
    const { data, status } = useQuery(
      ["single-order", { id, access }],
      GET_SINGLE_ORDER
    );
    if (status === "loading") return <CustomLoader type="Grid" />;
    if (data.order_status !== "ORDERED")
      return (
        <div
          className="container d-flex flex-column justify-content-center align-items-center pt-2 pb-2"
          style={{ minHeight: "300px" }}
        >
          <h6>
            Cannot Cancel This Order As its Order Status is {data.order_status}4
          </h6>
          <button
            onClick={() => {
              router.back();
            }}
            className="btn btn-primary btn-sm"
          >
            <i className="d-icon-arrow-left"></i>
            &nbsp; Go Back
          </button>
        </div>
      );

    return (
      <div className="container pt-5">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div className="cancellation-form">
              <CancelForm
                id={data.id}
                access={access}
                order_status={data.order_status}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <h4>Order Details</h4>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="font-weight-bold">Order </span> {data.id}{" "}
                {data.promo_code !== "" ? (
                  <p>Promo Code: {data.promo_code} Applied</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div>
              <span>
                <div className="d-flex flex-wrap">
                  {data.orders.map((order, index) => {
                    return (
                      <ALink
                        href={"/product/default/" + order.product.slug}
                        key={order.id}
                      >
                        <div className="d-flex mr-5 flex-column align-items-center mt-1">
                          <div className="order-img-container">
                            <img
                              src={order.product.product_image[0].url}
                              alt={order.product.title}
                            />
                          </div>
                          <div className="mt-2 text-center">
                            {order.product.title}
                            <br />
                            NPR. {order.product.display_price}
                            <br />
                            <i className="fas fa-times"></i> {order.quantity}
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
                  NPR. {data.sub_total}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center summary-subtotal">
                <div>
                  <h4 className="summary-subtitle">
                    Grand Total <small>(After 13% Tax)</small>
                  </h4>
                </div>
                <div className="summary-subtotal-price">NPR. {data.total}</div>
              </div>
              <div className="d-flex justify-content-between align-items-center summary-subtotal">
                <div>
                  <h4 className="summary-subtitle">Delivery Address</h4>
                </div>
                <div className="summary-subtotal-price">
                  {data.delivery_address}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center summary-subtotal">
                <div>
                  <h4 className="summary-subtitle">Contact Number</h4>
                </div>
                <div className="summary-subtotal-price">
                  {data.contact_number}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <CustomLoader type="Grid" />;
}
