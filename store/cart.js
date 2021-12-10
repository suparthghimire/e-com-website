// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { toast } from "react-toastify";
// import { takeEvery } from "redux-saga/effects";

// import CartPopup from "~/components/features/product/common/cart-popup";

// const actionTypes = {
//   ADD_TO_CART: "ADD_TO_CART",
//   REMOVE_FROM_CART: "REMOVE_FROM_CART",
//   UPDATE_CART: "UPDATE_CART",
//   REFRESH_STORE: "REFRESH_STORE",
// };

// const initialState = {
//   data: [],
// };

// function cartReducer(state = initialState, action) {
//   switch (action.type) {
//     case actionTypes.ADD_TO_CART:
//       let tmpProduct = { ...action.payload.product };
//       console.log(state);
//       const index = state.data.findIndex(
//         (item) => item.name === action.payload.product.name
//       );
//       if (index > -1) {
//         let same_pdt = state.data.some((item) => {
//           return (
//             item.name === tmpProduct.name &&
//             item.color === tmpProduct.color &&
//             item.size === tmpProduct.size
//           );
//         });
//         let tmpData = state.data.reduce((acc, cur) => {
//           const same_product =
//             cur.name === tmpProduct.name &&
//             cur.color === tmpProduct.color &&
//             cur.size === tmpProduct.size;
//           if (same_product) {
//             console.log("This is Same Product");
//             acc.push({
//               ...cur,
//               qty: parseInt(cur.qty) + parseInt(tmpProduct.qty),
//             });
//           } else if (!same_product) {
//             console.log("This is Not Same Product");
//             acc.push(tmpProduct);
//           }
//           return acc;
//         }, []);
//         console.log("Data Saving Same");
//         console.log({ ...state, data: tmpData });
//         console.log("same_pdt");
//         console.log("s", same_pdt);
//         if (same_pdt) {
//           return { ...state, data: tmpData };
//         } else {
//           tmpData = tmpData[0];
//           console.log(state);
//           console.log(tmpData);
//           console.log({ ...state, data: [...state.data, tmpData] });
//           return { ...state, data: [...state.data, tmpData] };
//         }
//       } else {
//         console.log("Data Saving Different");
//         console.log({ ...state, data: [...state.data, tmpProduct] });
//         return { ...state, data: [...state.data, tmpProduct] };
//       }

//     case actionTypes.REMOVE_FROM_CART:
//       let cart = state.data.reduce((cartAcc, product) => {
//         if (product.name !== action.payload.product.name) {
//           cartAcc.push(product);
//         }
//         return cartAcc;
//       }, []);

//       return { ...state, data: cart };

//     case actionTypes.UPDATE_CART:
//       return { ...state, data: action.payload.products };

//     case actionTypes.REFRESH_STORE:
//       return initialState;

//     default:
//       return state;
//   }
// }

// export const cartActions = {
//   addToCart: (product) => ({
//     type: actionTypes.ADD_TO_CART,
//     payload: { product },
//   }),
//   removeFromCart: (product) => ({
//     type: actionTypes.REMOVE_FROM_CART,
//     payload: { product },
//   }),
//   updateCart: (products) => ({
//     type: actionTypes.UPDATE_CART,
//     payload: { products },
//   }),
// };

// export function* cartSaga() {
//   yield takeEvery(actionTypes.ADD_TO_CART, function* saga(e) {
//     toast(<CartPopup product={e.payload.product} />);
//   });
// }

// const persistConfig = {
//   keyPrefix: "riode-",
//   key: "cart",
//   storage,
// };

// export default persistReducer(persistConfig, cartReducer);

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

      // if (
      //   state.data.findIndex(
      //     (item) => item.name === action.payload.product.name
      //   ) > -1
      // ) {
      //   let tmpData = state.data.reduce((acc, cur) => {
      //     const same_product =
      //       cur.name === tmpProduct.name &&
      //       cur.color === tmpProduct.color &&
      //       cur.size === tmpProduct.size;
      //     if (same_product) {
      //       console.log({
      //         ...cur,
      //         qty: parseInt(cur.qty) + parseInt(tmpProduct.qty),
      //       });
      //       acc.push({
      //         ...cur,
      //         qty: parseInt(cur.qty) + parseInt(tmpProduct.qty),
      //       });
      //     } else {
      //       acc.push(tmpProduct);
      //     }

      //     return acc;
      //   }, []);

      //   return { ...state, data: tmpData };
      // }
      if (
        state.data.findIndex(
          (item) => item.name === action.payload.product.name
        ) > -1
      ) {
        const same_prdt = state.data.some(
          (item) =>
            item.name === tmpProduct.name &&
            item.color === tmpProduct.color &&
            item.size === tmpProduct.size
        );
        let tmpData = state.data.reduce((acc, cur) => {
          const same_product =
            cur.name === tmpProduct.name &&
            cur.color === tmpProduct.color &&
            cur.size === tmpProduct.size;
          console.log(cur, tmpProduct, same_product);
          if (same_product) {
            console.log({
              ...cur,
              qty: parseInt(cur.qty) + parseInt(tmpProduct.qty),
            });
            acc.push({
              ...cur,
              qty: parseInt(cur.qty) + parseInt(tmpProduct.qty),
            });
          } else {
            acc.push(tmpProduct);
          }

          return acc;
        }, []);
        if (same_prdt) {
          console.log("This is Same Product", same_prdt);
          console.log(state);
          console.log(tmpData);
          const product = tmpData[0];
          // find index of that product that matches with
          const pdt_index = state.data.findIndex((pdt) => {
            return (
              product.name === pdt.name &&
              product.color === pdt.color &&
              product.size === pdt.size
            );
          });
          state.data.splice(pdt_index, 1);
          return { ...state, data: [...state.data, product] };
        } else if (!same_prdt) {
          console.log("This is Not Same Product", same_prdt);
          return { ...state, data: [...state.data, tmpProduct] };
        }
        // return { ...state, data: tmpData };
      } else {
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
