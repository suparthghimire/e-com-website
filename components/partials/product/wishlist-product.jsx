import { useState } from "react";
import ALink from "~/components/features/custom-link";

export default function WishListProduct(props) {
  const { product, removeFromWishlist, addToCart } = props;
  const [curColor, setCurColor] = useState("null");
  const [curSize, setCurSize] = useState("null");

  const addToCartHandler = () => {
    setCurColor(
      product.product_image.length > 0 ? product.product_image[0].color : ""
    );
    setCurSize(product.available_sizes);

    if (product.is_available) {
      addToCart({
        ...product,
        name: product.name,
        qty: 1,
        price: product.display_price,
        color: curColor,
        size: curSize,
      });
      removeFromWishlist(product);
    }
  };
  return (
    <tr key={"wishlist-" + product.name}>
      <td className="product-thumbnail">
        <ALink href={"/product/default/" + product.slug}>
          <figure>
            <img
              src={
                product.product_image.length > 0
                  ? product.product_image[0].url
                  : "./images/placeholder/product_placeholder.png"
              }
              width="100"
              height="100"
              alt="product"
            />
          </figure>
        </ALink>
      </td>
      <td className="font-weight-bold" style={{ fontSize: "1.5rem" }}>
        {product.name.length > 25
          ? product.name.slice(0, 25) + "..."
          : product.name}
      </td>
      <td>
        <h5 className="text-primary">In Stock</h5>
      </td>
      <td className="product-price">
        <span className="amount">{product.display_price}</span>
      </td>

      <td className="product-add-to-cart">
        <div className="d-flex" style={{ gap: "10px" }}>
          <div>
            <ALink
              href="#"
              className="add-to-cart-wishlist"
              name="Add to Cart"
              onClick={addToCartHandler}
            >
              Add To Cart
            </ALink>
          </div>
        </div>
      </td>
      <td className="product-remove">
        <div>
          <ALink href="#" className="remove" name="Remove this product">
            <i
              className="fas fa-times text-primary"
              onClick={() => removeFromWishlist(product)}
            ></i>
          </ALink>
        </div>
      </td>
    </tr>
  );
}
