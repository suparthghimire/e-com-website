import ALink from "~/components/features/custom-link";
import { useQuery } from "react-query";
import { GET_ALL_ORDERS } from "~/api/queries";
import Cookie from "js-cookie";
import CustomLoader from "~/components/common/custom-loader";
export default function Orders() {
  const { data, status } = useQuery(
    ["All Orders", { access: Cookie.get("rameti_ec_access") }],
    GET_ALL_ORDERS
  );
  if (status === "loading") return <CustomLoader type="Grid" />;
  return (
    <>
      <h3>My Orders</h3>
      <hr />
      <table className="order-table">
        <thead>
          <tr>
            <th className="pl-2">Order</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th className="pr-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((item, index) => {
            return (
              <tr>
                <td className="order-number">
                  {item.id.substr(0, 8) + "..."}{" "}
                </td>
                <td> {item.created_at.substr(0, 10)} </td>
                <td> {item.order_status} </td>
                <td> Nrs. {item.total} </td>
                <td>
                  {" "}
                  <ALink
                    href="/pages/order/"
                    className="btn btn-primary btn-link btn-underline"
                  >
                    View
                  </ALink>{" "}
                </td>
              </tr>
            );
          })}
          {/* <tr>
            <td className="order-number">
              <ALink href="#">#3596</ALink>
            </td>
            <td className="order-date">
              <time>February 24, 2021</time>
            </td>
            <td className="order-status">
              <span>On hold</span>
            </td>
            <td className="order-total">
              <span>$900.00 for 5 items</span>
            </td>
            <td className="order-action">
              <ALink
                href="#"
                className="btn btn-primary btn-link btn-underline"
              >
                View
              </ALink>
            </td>
          </tr> */}
        </tbody>
      </table>
    </>
  );
}
