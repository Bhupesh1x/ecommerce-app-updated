import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

export const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState,
  reducers: {
    getAllOrdersOfUser: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { getAllOrdersOfUser } = userOrdersSlice.actions;

export default userOrdersSlice.reducer;
