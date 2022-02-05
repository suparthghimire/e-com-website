import ALink from "~/components/features/custom-link";
import { useQuery } from "react-query";
import { GET_ALL_ORDERS } from "~/api/queries";
import Cookie from "js-cookie";
import CustomLoader from "~/components/common/custom-loader";
import OrderAccordian from "./order-accordian";
import { useEffect, useState } from "react";
export default function Orders() {
  const toggleAccordian = (index) => {
    document
      .getElementById(`accordian-body-${index}`)
      ?.classList.toggle("accordian-body-show");
    document
      .getElementById(`accordian-toggle-btn-${index}`)
      ?.classList.toggle("accordian-toggle-btn-active");
  };
  const { data, status } = useQuery(
    ["All Orders", { access: Cookie.get("rameti_ec_access") }],
    GET_ALL_ORDERS
  );
  const [showDetails, setDetails] = useState([]);

  if (status === "loading") return <CustomLoader type="Grid" />;
  return (
    <>
      <h3>My Orders</h3>
      <hr />
      <table className="order-table">
        <thead className="text-center">
          <tr>
            <th className="pl-2">Order</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th className="pr-2">View</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.results
            .filter((item) => item.order_status !== "CANCELLED")
            .map((item, index) => {
              return (
                <>
                  <tr key={"order-" + index}>
                    <td className="">{item.id.substr(0, 8) + ".."}</td>
                    <td> {item.created_at.substr(0, 10)} </td>
                    <td> {item.order_status} </td>
                    <td> NPR. {item.total} </td>
                    <td className="">
                      {/* <ALink
                    href="/pages/order/"
                    className="btn btn-primary btn-link btn-underline"
                  > */}
                      <div className="" style={{ gap: "5px" }}>
                        <button
                          className="accordian-toggle-btn"
                          id={"accordian-toggle-btn-" + index}
                          onClick={() => {
                            const dataIndex = showDetails.indexOf(item.id);
                            if (dataIndex == -1) {
                              setDetails([...showDetails, item.id]);
                            } else {
                              const tmp = [...showDetails];
                              tmp.splice(dataIndex, 1);
                              setDetails(tmp);
                            }
                          }}
                        >
                          <i className="fas fa-chevron-down"></i>
                        </button>
                      </div>
                      {/* </ALink> */}
                    </td>
                  </tr>
                  {showDetails.includes(item.id) && (
                    <OrderAccordian item={item} index={index} />
                  )}
                </>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
