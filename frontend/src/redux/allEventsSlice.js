import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const allEventsSlice = createSlice({
  name: "allEvents",
  initialState,
  reducers: {
    getAllEvents: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getAllEvents } = allEventsSlice.actions;

export default allEventsSlice.reducer;
