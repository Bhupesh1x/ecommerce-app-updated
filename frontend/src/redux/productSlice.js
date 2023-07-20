import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const productShopSlice = createSlice({
  name: "productShop",
  initialState,
  reducers: {
    getAllProductsOfShop: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getAllProductsOfShop } = productShopSlice.actions;

export default productShopSlice.reducer;
