import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";

import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { wishlistActions } from "~/store/wishlist";

import { toDecimal } from "~/utils";

function ProductThree(props) {
  const { product, adClass, toggleWishlist, wishlist, openQuickview } = props;
  // decide if the product is wishlisted
  let isWishlisted;
  isWishlisted =
    wishlist.findIndex((item) => item.slug === product.slug) > -1
      ? true
      : false;

  const showQuickviewHandler = () => {
    openQuickview(product.slug);
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
            src={product.product_image[0].url}
            threshold={500}
            effect="opacity"
            width="300"
          />

          {product.product_image.length >= 2 ? (
            <LazyLoadImage
              alt="product"
              src={product.product_image[1].url}
              threshold={500}
              width="300"
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
            <ins className="new-price">${toDecimal(product.display_price)}</ins>
            <del className="old-price">${toDecimal(product.price)}</del>
          </>
        </div>
        <div className="product-action">
          <ALink href={`/product/default/${product.slug}`}>
            <a
              href="#"
              className="btn btn-transparent pl-2 pr-2 border-primary btn-block"
            >
              <span>View Product</span>
            </a>
          </ALink>
          <a
            href="#"
            className="btn-product-icon btn-wishlist"
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={wishlistHandler}
          >
            <i
              className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}
            ></i>
          </a>
          <ALink
            href="#"
            className="btn-product-icon btn-quickview"
            title="Quick View"
            onClick={showQuickviewHandler}
          >
            <i className="d-icon-search"></i>
          </ALink>
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
