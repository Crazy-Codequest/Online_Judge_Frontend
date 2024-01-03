// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dataReducer from "../features/auth/dataSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
  },
});
export default store;
