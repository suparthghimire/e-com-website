import { connect } from "react-redux";
import Helmet from "react-helmet";
import { useRouter } from "next/router";
import ALink from "~/components/features/custom-link";
import CustomLoader from "../../components/common/custom-loader";
import CheckoutForm from "~/components/features/modals/forms/CheckoutForm";
import StepByStep from "~/components/common/step-by-step";
import { TITLE } from "~/config";
import { cartActions } from "~/store/cart";

function Checkout(props) {
  const router = useRouter();
  if (!props.loadingAuth && !props.auth) {
    console.log(props.loadingAuth, props.auth);
    console.log("In Checkout");
    router.push("/pages/login");
  }
  if (!props.loadingAuth && props.auth) {
    const { cartList, removeFromCart } = props;
    return (
      <main className="main checkout">
        <Helmet>
          <title>{TITLE} | Checkout</title>
        </Helmet>

        <h1 className="d-none">Riode React eCommerce Template - Checkout</h1>

        <div
          className={`page-content pt-7 pb-10 ${
            cartList.length > 0 ? "mb-10" : "mb-2"
          }`}
        >
          <StepByStep active="checkout" />
          <div className="container mt-7">
            {cartList.length > 0 ? (
              <>
                <CheckoutForm
                  user={props.user}
                  cartList={cartList}
                  removeFromCart={removeFromCart}
                />
              </>
            ) : (
              <div className="empty-cart text-center">
                <p>Your cart is currently empty.</p>
                <i className="cart-empty d-icon-bag"></i>
                <p className="return-to-shop mb-0">
                  <ALink
                    className="button wc-backward btn btn-dark btn-md"
                    href="/shop"
                  >
                    Return to shop
                  </ALink>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
  return <CustomLoader type="Grid" />;
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
  };
}

export default connect(mapStateToProps, {
  removeFromCart: cartActions.removeFromCart,
})(Checkout);

// export default connect(mapStateToProps)(Checkout);
