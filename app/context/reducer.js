import { version } from "react";

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATED_USER":
      return {
        ...state,
        user: action.payload,
      };

    /////////////////////// CART //////////////////////////

    case "ADD_PRODUCT_TO_CART":
      if (!state.cart) {
        if (action.payload.productType === "course") {
          const total = action.payload.price * action.payload.items;

          return {
            ...state,
            cart: [action.payload],
            cartPrice: total,
            cartItems: action.payload.items,
          };
        }
        const total = action.payload.price * action.payload.items;
        const totalVolume = 8 * 10 * 8 * action.payload.items;
        const totalWeight = 0.25;
        return {
          ...state,
          cart: [action.payload],
          cartPrice: total,
          cartItems: action.payload.items,
          payment: { totalVolume, totalWeight },
        };
      } else {
        const products = state.cart;
        const index = products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          products[index] = action.payload;
        } else {
          products.push(action.payload);
        }

        let totalPrice = 0;
        let totalItems = 0;
        let totalVolume = 0;
        let totalWeight = 0;
        products.forEach((product) => {
          const total = parseFloat(product.price) * product.items;
          totalPrice += total;
          totalItems += product.items;
          if (product.productType !== "course") {
            totalVolume += 8 * 10 * 8 * product.items;
            totalWeight += 0.25;
          }
        });

        return {
          ...state,
          cart: products,
          cartPrice: totalPrice,
          cartItems: totalItems,
          payment: { ...state.payment, totalVolume, totalWeight },
        };
      }

    case "REMOVE_PRODUCT_FROM_CART":
      const products = state.cart;
      const index = products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        products.splice(index, 1);
      }

      let totalPrice = 0;
      let totalItems = 0;
      let totalVolume = 0;
      let totalWeight = 0;

      products.forEach((product) => {
        const total = parseFloat(product.price) * product.items;

        totalPrice += total;
        totalItems += product.items;
        if (product.productType !== "course") {
          totalVolume += 8 * 10 * 8 * product.items;
          totalWeight += 0.25;
        }
      });

      return {
        ...state,
        cart: products,
        cartPrice: totalPrice,
        cartItems: totalItems,
        payment: { ...state.payment, totalVolume, totalWeight },
      };

    case "EMPTY_CART":
      return {
        ...state,
        cart: [],
        cartPrice: 0,
        cartItems: 0,
      };

    /////////////////////// PAYMENT //////////////////////////

    case "PAYMENT_INFORMATION":
      const paymentInfo = action.payload;
      return {
        ...state,
        payment: { ...state.payment, ...paymentInfo },
      };
    case "DELIVERY_COST":
      const deliveryCost = action.payload;
      return {
        ...state,
        payment: { ...state.payment, deliveryCost },
      };
    case "DELETE_DELIVERY_COST_INFORMATION":
      state.payment.deliveryCost = false;
      return {
        ...state,
      };
    case "PREFERENCE_ID":
      return {
        ...state,
        preference: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
