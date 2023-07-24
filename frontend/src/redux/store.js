import { configureStore } from "@reduxjs/toolkit";
import productShopReducer from "./productSlice";
import allProductsReducer from "./allProductsSlice";
import eventShopReducer from "./eventSlice";

export const store = configureStore({
  reducer: {
    productShop: productShopReducer,
    eventShop: eventShopReducer,
    allProducts: allProductsReducer,
  },
});
