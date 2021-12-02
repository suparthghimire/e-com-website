import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { toast } from "react-toastify";
import { takeEvery } from "redux-saga/effects";

import CartPopup from "~/components/features/product/common/cart-popup";

const actionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_CART: "UPDATE_CART",
  REFRESH_STORE: "REFRESH_STORE",
};

const initialState = {
  data: [],
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      let tmpProduct = { ...action.payload.product };
      console.log(tmpProduct);
      const index = state.data.findIndex(
        (item) => item.name === action.payload.product.name
      );
      if (index > -1) {
        let tmpData = state.data.reduce((acc, cur) => {
          const same_product =
            cur.name === tmpProduct.name &&
            cur.color === tmpProduct.color &&
            cur.size === tmpProduct.size;
          if (same_product) {
            console.log("This is Same Product");
            acc.push({
              ...cur,
              qty: parseInt(cur.qty) + parseInt(tmpProduct.qty),
            });
          } else if (!same_product) {
            console.log("This is Not Same Product");
            acc.push(tmpProduct);
          }
          return acc;
        }, []);
        console.log("Data Saving Same");
        console.log({ ...state, data: tmpData });
        return { ...state, data: tmpData };
      } else {
        console.log("Data Saving Different");
        console.log({ ...state, data: [...state.data, tmpProduct] });
        return { ...state, data: [...state.data, tmpProduct] };
      }

    case actionTypes.REMOVE_FROM_CART:
      let cart = state.data.reduce((cartAcc, product) => {
        if (product.name !== action.payload.product.name) {
          cartAcc.push(product);
        }
        return cartAcc;
      }, []);

      return { ...state, data: cart };

    case actionTypes.UPDATE_CART:
      return { ...state, data: action.payload.products };

    case actionTypes.REFRESH_STORE:
      return initialState;

    default:
      return state;
  }
}

export const cartActions = {
  addToCart: (product) => ({
    type: actionTypes.ADD_TO_CART,
    payload: { product },
  }),
  removeFromCart: (product) => ({
    type: actionTypes.REMOVE_FROM_CART,
    payload: { product },
  }),
  updateCart: (products) => ({
    type: actionTypes.UPDATE_CART,
    payload: { products },
  }),
};

export function* cartSaga() {
  yield takeEvery(actionTypes.ADD_TO_CART, function* saga(e) {
    toast(<CartPopup product={e.payload.product} />);
  });
}

const persistConfig = {
  keyPrefix: "riode-",
  key: "cart",
  storage,
};

export default persistReducer(persistConfig, cartReducer);
