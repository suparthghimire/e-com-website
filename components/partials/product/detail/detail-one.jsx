import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Collapse from "react-bootstrap/Collapse";

import ALink from "~/components/features/custom-link";
import Countdown from "~/components/features/countdown";
import Quantity from "~/components/features/quantity";

import ProductNav from "~/components/partials/product/product-nav";

import { wishlistActions } from "~/store/wishlist";
import { cartActions } from "~/store/cart";

import { toDecimal } from "~/utils";

function DetailOne(props) {
  let router = useRouter();
  const { product, isStickyCart = false, adClass = "", isNav = true } = props;
  const { toggleWishlist, addToCart, wishlist } = props;
  const [curColor, setCurColor] = useState("null");
  const [curSize, setCurSize] = useState("null");
  const [cartActive, setCartActive] = useState(false);
  const [quantity, setQauntity] = useState(1);

  // decide if the product is wishlisted
  let isWishlisted,
    colors = [] && product.product_image.map((pdt) => pdt.color_hex),
    sizes = [] && product.available_sizes;
  console.log(sizes, colors);
  isWishlisted =
    wishlist.findIndex((item) => item.slug === product.slug) > -1
      ? true
      : false;

  useEffect(() => {
    return () => {
      resetValueHandler();
    };
  }, [product]);

  useEffect(() => {
    if (sizes.length > 0 || colors > 0) {
      if (
        (curSize !== "null" && curColor !== "null") ||
        (curSize === "null" && sizes.length === null && curColor !== "null") ||
        (curColor === "null" && colors === null && curSize !== "null")
      ) {
        setCartActive(true);
      } else {
        setCartActive(false);
      }
    } else {
      setCartActive(true);
    }

    if (product.stock === 0) {
      setCartActive(false);
    }
  }, [curColor, curSize, product]);

  const wishlistHandler = (e) => {
    e.preventDefault();

    if (toggleWishlist && !isWishlisted) {
      let currentTarget = e.currentTarget;
      currentTarget.classList.add("load-more-overlay", "loading");
      toggleWishlist({ ...product, name: product.title });

      setTimeout(() => {
        currentTarget.classList.remove("load-more-overlay", "loading");
      }, 1000);
    } else {
      router.push("/pages/wishlist");
    }
  };

  const setColorHandler = (e) => {
    setCurColor(e.target.value);
  };

  const setSizeHandler = (e) => {
    setCurSize(e.target.value);
  };

  const addToCartHandler = () => {
    if (product.is_available && cartActive) {
      addToCart({
        ...product,
        name: product.title + "-" + curColor + "-" + curSize,
        qty: quantity,
        price: product.display_price,
      });
    }
  };

  const resetValueHandler = (e) => {
    setCurColor("null");
    setCurSize("null");
  };

  function isDisabled(color, size) {
    if (color === "null" || size === "null") return false;
    if (sizes.length === 0) {
      return (
        product.product_image.findIndex(
          (item) => item.color_name === curColor
        ) === -1
      );
    }
    if (colors.length === 0) {
      return (
        product.available_sizes.findIndex((item) => item === curSize) === -1
      );
    }
    // return (
    //   product.data.variants.findIndex(
    //     (item) => item.color.name === color && item.size.name === size
    //   ) === -1
    // );
  }

  function changeQty(qty) {
    setQauntity(qty);
  }

  return (
    <div
      className={"product-details p-sticky" + adClass}
      style={{ top: "70px" }}
    >
      {isNav ? (
        <div className="product-navigation">
          <ul className="breadcrumb breadcrumb-lg">
            <li>
              <ALink href="/">
                <i className="d-icon-home"></i>
              </ALink>
            </li>
            <li>
              <ALink href="#" className="active">
                Products
              </ALink>
            </li>
            <li>Detail</li>
          </ul>

          {/* <ProductNav product={product} /> */}
        </div>
      ) : (
        ""
      )}

      <h2 className="product-name">{product.title}</h2>

      {/* <div className="product-meta">
        SKU: <span className="product-sku">{product.data.sku}</span>
        CATEGORIES:{" "}
        <span className="product-brand">
          {product.data.categories.map((item, index) => (
            <React.Fragment key={item.name + "-" + index}>
              <ALink
                href={{ pathname: "/shop", query: { category: item.slug } }}
              >
                {item.name}
              </ALink>
              {index < product.data.categories.length - 1 ? ", " : ""}
            </React.Fragment>
          ))}
        </span>
      </div> */}

      <div className="product-price">
        <ins className="new-price">{product.display_price}</ins>

        <del className="old-price">{product.price}</del>
      </div>

      <div className="ratings-container">
        <div className="ratings-full">
          <span className="ratings" style={{ width: 20 * 5 + "%" }}></span>
          <span className="tooltiptext tooltip-top">{toDecimal(5)}</span>
        </div>
        <ALink href="#" className="rating-reviews">
          ( 5 reviews )
        </ALink>
      </div>

      <p className="product-short-desc">{product.description}</p>

      {(product && sizes.length > 0) || colors.length ? (
        <>
          {product.product_image ? (
            <div className="product-form product-variations product-color">
              <label>Color:</label>
              <div className="select-box">
                <select
                  name="color"
                  className="form-control select-color"
                  onChange={setColorHandler}
                  value={curColor}
                >
                  <option value="null">Choose an Option</option>
                  {product.product_image.map((item) =>
                    !isDisabled(item.name, curSize) ? (
                      <option
                        value={item.color_hex}
                        key={"color-" + item.color_hex}
                      >
                        {item.color_hex}
                      </option>
                    ) : (
                      ""
                    )
                  )}
                </select>
              </div>
            </div>
          ) : (
            ""
          )}

          {product.available_sizes ? (
            <div className="product-form product-variations product-size mb-0 pb-2">
              <label>Size:</label>
              <div className="product-form-group">
                <div className="select-box">
                  <select
                    name="size"
                    className="form-control select-size"
                    onChange={setSizeHandler}
                    value={curSize}
                  >
                    <option value="null">Choose an Option</option>
                    {sizes.map((item) =>
                      !isDisabled(curColor, item) ? (
                        <option value={item} key={"size-" + item}>
                          {item}
                        </option>
                      ) : (
                        ""
                      )
                    )}
                  </select>
                </div>

                <Collapse in={"null" !== curColor || "null" !== curSize}>
                  <div className="card-wrapper overflow-hidden reset-value-button w-100 mb-0">
                    <ALink
                      href="#"
                      className="product-variation-clean"
                      onClick={resetValueHandler}
                    >
                      Clean All
                    </ALink>
                  </div>
                </Collapse>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="product-variation-price">
            <Collapse in={cartActive}>
              <div className="card-wrapper">
                <div className="single-product-price">
                  <div className="product-price mb-0">
                    <ins className="new-price">
                      ${toDecimal(product.display_price)}
                    </ins>
                    <del className="old-price">${toDecimal(product.price)}</del>
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        </>
      ) : (
        ""
      )}

      <hr className="product-divider"></hr>
      <div className="product-form product-qty pb-0">
        <label className="d-none">QTY:</label>
        <div className="product-form-group">
          <Quantity max={20} product={product} onChangeQty={changeQty} />
          <button
            className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${
              cartActive ? "" : "disabled"
            }`}
            onClick={addToCartHandler}
          >
            <i className="d-icon-bag"></i>Add to Cart
          </button>
        </div>
      </div>

      <hr className="product-divider mb-3"></hr>

      <div className="product-footer">
        <div className="social-links mr-4">
          <ALink
            href="#"
            className="social-link social-facebook fab fa-facebook-f"
          ></ALink>
          <ALink
            href="#"
            className="social-link social-twitter fab fa-twitter"
          ></ALink>
          <ALink
            href="#"
            className="social-link social-pinterest fab fa-pinterest-p"
          ></ALink>
        </div>{" "}
        <span className="divider d-lg-show"></span>{" "}
        <a
          href="#"
          className={`btn-product btn-wishlist`}
          title={isWishlisted ? "Browse wishlist" : "Add to wishlist"}
          onClick={wishlistHandler}
        >
          <i
            className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}
          ></i>{" "}
          {isWishlisted ? "Browse wishlist" : "Add to Wishlist"}
        </a>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.data ? state.wishlist.data : [],
  };
}

export default connect(mapStateToProps, {
  toggleWishlist: wishlistActions.toggleWishlist,
  addToCart: cartActions.addToCart,
})(DetailOne);
