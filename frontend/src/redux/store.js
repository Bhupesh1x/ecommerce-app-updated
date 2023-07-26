import { configureStore } from "@reduxjs/toolkit";
import productShopReducer from "./shopEventSlice";
import allProductsReducer from "./allProductsSlice";
import allEventsReducer from "./allEventsSlice";
import eventShopReducer from "./shopEventSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    productShop: productShopReducer,
    eventShop: eventShopReducer,
    allProducts: allProductsReducer,
    allEvents: allEventsReducer,
    cart: cartReducer,
  },
});
