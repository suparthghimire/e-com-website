import ALink from "~/components/features/custom-link";

export default function Orders() {
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
          <tr>
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
          </tr>
        </tbody>
      </table>
    </>
  );
}
