import { configureStore } from "@reduxjs/toolkit";
import productShopReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    productShop: productShopReducer,
  },
});
