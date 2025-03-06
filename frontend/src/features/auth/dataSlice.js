import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timestamp: null,
  search: ""
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setTimestamp: (state, action) => {
      const { payload } = action;
      state.timestamp = payload;
    },
    setSearch: (state, action) => {
      const { payload } = action;
      state.search = payload;
    }
  },
});

export const { setTimestamp, setSearch } = dataSlice.actions;

export default dataSlice.reducer;
