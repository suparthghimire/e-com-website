import { connect } from "react-redux";
import Helmet from "react-helmet";
import { modalActions } from "~/store/modal";
import ALink from "~/components/features/custom-link";
import { useRouter } from "next/router";
import { cartActions } from "~/store/cart";
import { wishlistActions } from "~/store/wishlist";
import WishListProduct from "~/components/partials/product/wishlist-product";
import { toDecimal } from "~/utils";
import { TITLE } from "~/config";
function Wishlist(props) {
  const router = useRouter();
  const { wishlist, addToCart, removeFromWishlist } = props;

  return (
    <main className="main">
      <Helmet>
        <title>{TITLE} | Wishlist</title>
      </Helmet>

      <h1 className="d-none">Riode React eCommerce Template - Wishlist</h1>
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <ALink href="/">
                <i className="d-icon-home"></i>
              </ALink>
            </li>
            <li>Wishlist</li>
          </ul>
        </div>
      </nav>

      <div className="page-content pt-10 pb-10 mb-2">
        <div className="container">
          {wishlist.length > 0 ? (
            <>
              <h3>My Wishlist in Rameti</h3>

              <table className="shop-table wishlist-table mt-2 mb-4">
                <thead>
                  <tr>
                    <th className="product-name">
                      <span>Product</span>
                    </th>
                    <th>
                      <span></span>
                    </th>
                    <th>
                      <span>Stock Status</span>
                    </th>
                    <th className="product-price">
                      <span>Price</span>
                    </th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="wishlist-items-wrapper">
                  {wishlist.map((item) => (
                    <WishListProduct
                      product={item}
                      removeFromWishlist={removeFromWishlist}
                      addToCart={addToCart}
                    />
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="empty-cart text-center">
              <i className="wishlist-empty far fa-heart"></i>
              <p>No products added to the wishlist.</p>
              <p className="return-to-shop mb-0">
                <button
                  className="button wc-backward btn btn-dark btn-md"
                  onClick={() => {
                    router.back();
                  }}
                >
                  Return to shop
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
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
  removeFromWishlist: wishlistActions.removeFromWishlist,
  ...modalActions,
})(Wishlist);
