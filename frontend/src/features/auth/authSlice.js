// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { payload } = action;
      state.isAuthenticated = true;
      state.user = payload.user;
      state.token = payload.token;
      state.loading = false;
    },
    logout: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.token = "";
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
