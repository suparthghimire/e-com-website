import React from "react";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";

export default function WishListProduct(props) {
  const { item, openQuickview, removeFromWishlist } = props;
  const showQuickviewHandler = () => {
    openQuickview(item.slug);
  };
  return (
    <tr key={"wishlist-" + item.name}>
      <td className="product-thumbnail">
        <ALink href={"/product/default/" + item.slug}>
          <figure>
            <img
              src={item.product_image[0].url}
              width="100"
              height="100"
              alt="product"
            />
          </figure>
        </ALink>
      </td>
      <td className="font-weight-bold" style={{ fontSize: "1.5rem" }}>
        {item.name.length > 25 ? item.name.slice(0, 25) + "..." : item.name}
      </td>
      <td>
        <h5 className="text-primary">In Stock</h5>
      </td>
      <td className="product-price">
        <span className="amount">{item.display_price}</span>
      </td>

      <td className="product-add-to-cart">
        <div className="d-flex" style={{ gap: "10px" }}>
          <div>
            <ALink
              href="#"
              className="add-to-cart-wishlist"
              title="Add to Cart"
              onClick={showQuickviewHandler}
            >
              Add To Cart
            </ALink>
          </div>
        </div>
      </td>
      <td className="product-remove">
        <div>
          <ALink href="#" className="remove" title="Remove this product">
            <i
              className="fas fa-times text-primary"
              onClick={() => removeFromWishlist(item)}
            ></i>
          </ALink>
        </div>
      </td>
    </tr>
  );
}
