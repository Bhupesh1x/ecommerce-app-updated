import { configureStore } from "@reduxjs/toolkit";
import productShopReducer from "./shopProductSlice";
import allProductsReducer from "./allProductsSlice";
import allEventsReducer from "./allEventsSlice";
import eventShopReducer from "./shopEventSlice";
import cartReducer from "./cartSlice";
import userOrdersReducer from "./userOrdersSlice";

export const store = configureStore({
  reducer: {
    productShop: productShopReducer,
    eventShop: eventShopReducer,
    allProducts: allProductsReducer,
    allEvents: allEventsReducer,
    cart: cartReducer,
    userOrders: userOrdersReducer,
  },
});
