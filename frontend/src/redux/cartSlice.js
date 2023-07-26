import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("eshopCartItems")
    ? JSON.parse(localStorage.getItem("eshopCartItems"))
    : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const items = action.payload;
      const isItemExist = state.value.find((item) => item._id === items._id);
      if (isItemExist) {
        const data = {
          ...state,
          value: state.value.map((item) =>
            item._id === isItemExist._id
              ? { ...items, qty: item.qty + 1 }
              : item
          ),
        };
        localStorage.setItem("eshopCartItems", JSON.stringify(data?.value));
        return data;
      } else {
        const data = {
          ...state,
          value: [...state.value, { ...items, qty: items.qty ? items.qty : 1 }],
        };
        localStorage.setItem("eshopCartItems", JSON.stringify(data?.value));
        return data;
      }
    },
    removeFromCart: (state, action) => {
      const data = {
        ...state,
        value: state.value.filter((item) => item._id === action.payload),
      };
      localStorage.setItem("eshopCartItems", JSON.stringify(data?.value));
      return data;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
