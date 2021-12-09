import { connect } from "react-redux";
import { useEffect, useState } from "react";

import ALink from "~/components/features/custom-link";
import Quantity from "~/components/features/quantity";
import StepByStep from "~/components/common/step-by-step";

import { cartActions } from "~/store/cart";

import { toDecimal, getTotalPrice } from "~/utils";

function Cart(props) {
  const { cartList, removeFromCart, updateCart } = props;
  const [cartItems, setCartItems] = useState([]);

  console.log(cartList);

  useEffect(() => {
    setCartItems([...cartList]);
  }, [cartList]);

  const onChangeQty = (name, qty) => {
    setCartItems(
      cartItems.map((item) => {
        return item.name === name ? { ...item, qty: qty } : item;
      })
    );
  };

  const compareItems = () => {
    if (cartItems.length !== cartList.length) return false;

    for (let index = 0; index < cartItems.length; index++) {
      if (cartItems[index].qty !== cartList[index].qty) return false;
    }

    return true;
  };

  const update = () => {
    updateCart(cartItems);
  };
  return (
    <div className="main cart">
      <div className="page-content pt-7 pb-10">
        <StepByStep active="cart" />

        <div className="container mt-7 mb-2">
          <div className="row">
            {cartItems.length > 0 ? (
              <>
                <div className="col-lg-12 col-md-12">
                  <table className="shop-table cart-table">
                    <thead>
                      <tr className="pl-2 pr-2">
                        <th>
                          <span>Product</span>
                        </th>
                        <th>Product Name</th>
                        <th>Product Color</th>
                        <th>Product Size</th>
                        <th>
                          <span>Price</span>
                        </th>
                        <th>
                          <span>quantity</span>
                        </th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={"cart" + item.name} className="pl-2 pr-2">
                          <td className="product-thumbnail">
                            <figure>
                              <ALink href={"/product/default/" + item.slug}>
                                <img
                                  src={
                                    item.product_image.length <= 0
                                      ? "./images/product.jpg"
                                      : item.product_image[0].url
                                  }
                                  width="100"
                                  height="100"
                                  alt="product"
                                />
                              </ALink>
                            </figure>
                          </td>
                          <td className="product-name">
                            <div className="product-name-section">
                              <ALink href={"/product/default/" + item.slug}>
                                {item.name}
                              </ALink>
                            </div>
                          </td>
                          <td className="product-name">
                            <div
                              className="color-div ml-0 mr-0 pl-0 pr-0 no-hover"
                              style={{ backgroundColor: item.color }}
                            ></div>
                          </td>
                          <td className="product-name">
                            <span className="amount">Size: {item.size}</span>
                          </td>
                          <td className="product-subtotal">
                            <span className="amount">
                              NPR. {toDecimal(item.price)}
                            </span>
                          </td>

                          <td className="product-quantity">
                            <Quantity
                              qty={item.qty}
                              max={999999999999}
                              onChangeQty={(qty) => onChangeQty(item.name, qty)}
                            />
                          </td>
                          <td className="product-price">
                            <span className="amount">
                              NPR. {toDecimal(item.price * item.qty)}
                            </span>
                          </td>
                          <td className="product-close">
                            <ALink
                              href="#"
                              className="product-remove btn-lg"
                              style={
                                {
                                  // width: "30px",
                                  // height: "30px",
                                  // display: "flex",
                                  // fontSize: "1.5rem",
                                  // alignItems: "center",
                                  // justifyContent: "center",
                                  // color: "white",
                                  // backgroundColor: "red",
                                }
                              }
                              title="Remove this product"
                              onClick={() => removeFromCart(item)}
                            >
                              <i className="fas fa-times"></i>
                            </ALink>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="cart-actions mb-6 pt-4">
                    <ALink
                      href="/shop"
                      className="btn btn-dark btn-md btn-rounded btn-icon-left mr-4 mb-4"
                    >
                      <i className="d-icon-arrow-left"></i>Continue Shopping
                    </ALink>
                    <button
                      type="submit"
                      className={`btn btn-outline btn-dark btn-md btn-rounded ${
                        compareItems() ? " btn-disabled" : ""
                      }`}
                      onClick={update}
                    >
                      Update Cart
                    </button>
                  </div>
                </div>

                <div className="row pr-0 mr-0 d-flex justify-content-end">
                  {/* <div className="col-8"></div> */}
                  {/* <div className="col-8"> */}
                  <ALink
                    href="/pages/checkout"
                    className="btn btn-dark btn-rounded btn-checkout"
                    style={{ width: "fit-content" }}
                  >
                    Proceed to checkout
                  </ALink>
                  {/* </div> */}
                </div>
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
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
  };
}

export default connect(mapStateToProps, {
  removeFromCart: cartActions.removeFromCart,
  updateCart: cartActions.updateCart,
})(Cart);
