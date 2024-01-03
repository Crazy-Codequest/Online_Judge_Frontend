import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timestamp: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setTimestamp: (state, action) => {
      const { payload } = action;
      state.timestamp = payload;
    },
  },
});

export const { setTimestamp } = dataSlice.actions;

export default dataSlice.reducer;
