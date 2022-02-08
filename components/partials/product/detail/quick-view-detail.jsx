import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Collapse from "react-bootstrap/Collapse";

import ALink from "~/components/features/custom-link";
import Quantity from "~/components/features/quantity";

import { wishlistActions } from "~/store/wishlist";
import { cartActions } from "~/store/cart";

import { toDecimal } from "~/utils";

function ModalDetailOne(props) {
  let router = useRouter();
  const { product, isStickyCart = false, adClass = "", isNav = true } = props;
  const { toggleWishlist, addToCart, wishlist } = props;
  const [curColor, setCurColor] = useState("null");
  const [curSize, setCurSize] = useState("null");
  const [cartActive, setCartActive] = useState(false);
  const [quantity, setQauntity] = useState(1);
  let isWishlisted,
    colors = [] && product.product_image.map((pdt) => pdt.color),
    sizes = [] && product.available_sizes;
  const [colorList, setColorList] = useState({ active: null, colors: colors });

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
    const av_colors = product.product_image.map((pdt) => pdt.color);
    const av_sizes = product.available_sizes;
    if (av_colors.length === 0 && av_sizes.length === 0) setCartActive(true);

    if (av_colors.length === 0 && curSize !== "null") setCartActive(true);
    if (av_sizes.length === 0 && curColor !== "null") setCartActive(true);

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

  const setColorHandler = (color, index) => {
    setCurColor(color);
    const active_color = colorList.colors[index];
    setColorList({ ...colorList, active: active_color });
  };
  const toggleActiveColorBtnStyle = (index) => {
    if (colorList.colors[index] === colorList.active) {
      return "active-color-box";
    }
    return "";
  };
  const setSizeHandler = (e) => {
    setCurSize(e.target.value);
  };

  const addToCartHandler = () => {
    if (product.is_available && cartActive) {
      addToCart({
        ...product,
        name: product.title,
        qty: quantity,
        price: product.display_price,
        color: curColor,
        size: curSize,
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
    <div className={"product-details p-sticky" + adClass}>
      <h2 className="product-name">{product.title}</h2>

      <div className="product-price">
        <ins className="new-price">{product.display_price}</ins>

        <del className="old-price">{product.price}</del>
      </div>

      <p
        className="product-short-desc"
        dangerouslySetInnerHTML={{ __html: product.description }}
      ></p>

      <div className="product-form product-variations product-color d-flex align-items-end">
        {colors.length > 0 ? (
          <>
            <label>Colors:</label>
            {colorList.colors.map((item, index) => (
              <div className="ml-1" key={index}>
                <label className="color-picker-label" htmlFor={item}>
                  <div
                    className={
                      toggleActiveColorBtnStyle(index) +
                      " color-div ml-0 mr-0 pl-0 pr-0"
                    }
                    style={{
                      background: item,
                    }}
                    onClick={() => {
                      setColorHandler(item, index);
                    }}
                  ></div>
                </label>
              </div>
            ))}
          </>
        ) : (
          ""
        )}
      </div>
      {(product && sizes.length > 0) || colors.length ? (
        <>
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
                      ${" "}
                      {product.display_price &&
                        toDecimal(product.display_price)}
                    </ins>
                    <del className="old-price">
                      $ {product.price && toDecimal(product.price)}
                    </del>
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
        <span className="divider d-lg-show"></span>
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
})(ModalDetailOne);
