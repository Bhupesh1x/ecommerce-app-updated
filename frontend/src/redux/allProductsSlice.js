import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const allProductSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getAllProducts } = allProductSlice.actions;

export default allProductSlice.reducer;
