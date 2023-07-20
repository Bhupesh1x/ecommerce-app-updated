import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const eventShopSlice = createSlice({
  name: "eventShop",
  initialState,
  reducers: {
    getAllEventsOfShop: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getAllEventsOfShop } = eventShopSlice.actions;

export default eventShopSlice.reducer;
