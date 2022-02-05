import { useEffect } from "react";
import ALink from "~/components/features/custom-link";

export default function OrderAccordian({ item, index }) {
  useEffect(() => {
    document
      .getElementById(`accordian-body-${index}`)
      .classList.toggle("accordian-body-show");
    document
      .getElementById(`accordian-toggle-btn-${index}`)
      .classList.toggle("accordian-toggle-btn-active");
  }, [index]);

  return (
    <tr>
      <td colSpan={5}>
        <div
          className="accordian-body"
          style={{ padding: "40px" }}
          id={"accordian-body-" + index}
        >
          <span>
            <div className="d-flex flex-wrap">
              {item.orders.map((order, index) => {
                return (
                  <ALink
                    key={index}
                    href={"/product/default/" + order.product.slug}
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
            <div className="summary-subtotal-price">NPR. {item.sub_total}</div>
          </div>
          <div className="d-flex justify-content-between align-items-center summary-subtotal">
            <div>
              <h4 className="summary-subtitle">Grand Total</h4>
            </div>
            <div className="summary-subtotal-price">NPR. {item.total}</div>
          </div>
          <div className="d-flex justify-content-between align-items-center summary-subtotal">
            <div>
              <h4 className="summary-subtitle">Delivery Address</h4>
            </div>
            <div className="summary-subtotal-price">
              {item.delivery_address}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center summary-subtotal">
            <div>
              <h4 className="summary-subtitle">Contact Number</h4>
            </div>
            <div className="summary-subtotal-price">{item.contact_number}</div>
          </div>
          {item.order_status === "ORDERED" ? (
            <div className="summary-subtotal">
              <div>
                {item.order_status === "ORDERED" ? (
                  <ALink href={"/pages/cancel-order/" + item.id}>
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
  );
}
