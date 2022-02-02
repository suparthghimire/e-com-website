import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";

import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { wishlistActions } from "~/store/wishlist";

import { toDecimal } from "~/utils";
import { useState, useEffect } from "react";

function ProductThree(props) {
  const {
    product,
    adClass,
    toggleWishlist,
    wishlist,
    openQuickview,
    addToCart,
  } = props;
  let isWishlisted;
  isWishlisted =
    wishlist.findIndex((item) => item.slug === product.slug) > -1
      ? true
      : false;

  let colors = [] && [
    ...new Set(product.product_image.map((pdt) => pdt.color.toLowerCase())),
  ];
  let sizes = [] && [...new Set(product.available_sizes)];

  const [curColor, setCurColor] = useState("null");
  const [curSize, setCurSize] = useState("null");

  const addToCartHandler = () => {
    setCurColor(product.product_image[0].color);
    setCurSize(product.available_sizes);

    if (product.is_available) {
      addToCart({
        ...product,
        name: product.title,
        qty: 1,
        price: product.display_price,
        color: curColor,
        size: curSize,
      });
    }
  };

  const wishlistHandler = (e) => {
    if (toggleWishlist) {
      toggleWishlist({ ...product, name: product.title });
    }

    e.preventDefault();
    let currentTarget = e.currentTarget;
    currentTarget.classList.add("load-more-overlay", "loading");

    setTimeout(() => {
      currentTarget.classList.remove("load-more-overlay", "loading");
    }, 1000);
  };
  return (
    <div className={`product product-classic ${adClass} `}>
      <figure className="product-media">
        <ALink href={`/product/default/${product.slug}`}>
          <LazyLoadImage
            alt="product"
            src={product.product_image[0]?.url}
            threshold={500}
            effect="opacity"
          />

          {product.product_image.length >= 2 ? (
            <LazyLoadImage
              alt="product"
              src={product.product_image[1].url}
              threshold={500}
              effect="opacity"
              wrapperClassName="product-image-hover"
            />
          ) : (
            ""
          )}
        </ALink>
        <div className="product-label-group">
          {product.is_new ? (
            <label className="product-label label-new">New</label>
          ) : (
            ""
          )}
          {product.is_top ? (
            <label className="product-label label-top">Top</label>
          ) : (
            ""
          )}
        </div>
      </figure>

      <div className="product-details">
        <h3 className="product-name">
          <ALink href={`/product/default/${product.slug}`}>
            {product.title}
          </ALink>
        </h3>

        <div className="product-price">
          <>
            <ins className="new-price">
              NPR. {toDecimal(product.display_price)}
            </ins>
            <del className="old-price">NPR. {toDecimal(product.price)}</del>
          </>
        </div>
        <div className="product-action">
          <ALink
            href="#"
            className="btn-product btn-cart color-primary"
            style={{ borderRadius: "0.5rem" }}
            title="Add to cart"
            onClick={addToCartHandler}
          >
            <i className="d-icon-bag"></i>
            <span>Add to cart</span>
          </ALink>
          <a
            href="#"
            className="btn-product-icon btn-wishlist d-sm-none"
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={wishlistHandler}
          >
            <i
              className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}
            ></i>
          </a>
          <div
            className="btn-product-icon d-block display-sm-block-md-none"
            style={{ marginTop: "5px" }}
            onClick={wishlistHandler}
          >
            <i
              className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}
            ></i>
          </div>
        </div>
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
  ...modalActions,
})(ProductThree);
