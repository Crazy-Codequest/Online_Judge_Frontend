import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "./features/auth/authSlice";
import React, { useEffect } from "react";
import Loader from "./pages/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { urlConstants } from "./apis";
import { getConfig } from "./utils/getConfig";
import { CheckOutlined, ErrorOutline, InfoOutlined, WarningOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { useIsSystemDarkMode, useTheme as useThemeContext } from "./ThemeContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Suspense } from "react";

function App() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { isSystemDarkMode } = useIsSystemDarkMode();
  const { themePref } = useThemeContext();

  const verifyUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"))?.user;
    if (user) {
      try {
        await axios.post(urlConstants.getProblem, { id: "656612ed7552afc6bcbda006" }, getConfig());
        dispatch(loginSuccess({ user }));
      } catch (e) {
        localStorage.removeItem("user");
        dispatch(logout());
      }
    } else {
      localStorage.removeItem("user");
      dispatch(logout());
    }
  };

  useEffect(() => {
    verifyUser();
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => console.log("Service Worker registered with scope:", registration.scope))
        .catch((err) => console.error("Service Worker registration failed:", err));
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        icon={({ type }) => {
          switch (type) {
            case "success": return <CheckOutlined sx={{ color: palette.success.main }} />;
            case "info": return <InfoOutlined sx={{ color: palette.info.main }} />;
            case "warning": return <WarningOutlined sx={{ color: palette.warning.main }} />;
            case "error": return <ErrorOutline sx={{ color: palette.error.main }} />;
            default: return false;
          }
        }}
        theme={themePref === "system" ? (isSystemDarkMode ? "dark" : "light") : themePref}
        toastClassName="custom-toast"
      />
    </Suspense>
  );
}

export default App;
