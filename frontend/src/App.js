import Compiler from "./pages/Compiler/index";
import "./App.css";
import SignIn from "./pages/Login/Login";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import SignUp from "./pages/Login/Signup";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "./features/auth/authSlice";
import React, { useEffect } from "react";
import Loader from "./pages/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProblemList from "./pages/Problems";
import StatementPage from "./pages/StatementPage";
import Navbar from "./pages/Navbar";
import Competitions from "./pages/Competitions";
import Competition from "./pages/Competitions/Competition";
import axios from "axios";
import { urlConstants } from "./apis";
import { getConfig } from "./utils/getConfig";
import ProfilePage from "./pages/Profile";
import Admin from "./pages/Admin";
import CompetitionProblem from "./pages/Competitions/Problems/Statement";
import Home from "./pages/Home";
import Problem from "./pages/Problems/Problem";
import Analytics from "./pages/Analytics";
import {
  CheckOutlined,
  ErrorOutline,
  InfoOutlined,
  WarningOutlined,
} from "@mui/icons-material";
import { useTheme } from "@mui/material";
import {
  useIsSystemDarkMode,
  useTheme as useThemeContext,
} from "./ThemeContext";

function App() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { isSystemDarkMode } = useIsSystemDarkMode();
  const { themePref } = useThemeContext();


  const verifyUser = async () => {
    let user = JSON.parse(localStorage.getItem("user"))?.user;
    if (user) {
      try {
        await axios.post(
          urlConstants.getProblem,
          {
            id: "656612ed7552afc6bcbda006",
          },
          getConfig()
        );
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

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  }

  useEffect(() => {
    verifyUser();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
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
            case "success":
              return <CheckOutlined sx={{ color: palette.success.main }} />;
            case "info":
              return <InfoOutlined sx={{ color: palette.info.main }} />;
            case "warning":
              return <WarningOutlined sx={{ color: palette.warning.main }} />;
            case "error":
              return <ErrorOutline sx={{ color: palette.error.main }} />;
            default:
              return false;
          }
        }}
        theme={
          themePref === "system"
            ? isSystemDarkMode
              ? "dark"
              : "light"
            : themePref
        }
        toastClassName="custom-toast"
      />

      {isAuthenticated ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/statement/:id" element={<StatementPage />} />
            <Route
              path="/competition/statement/:id"
              element={<CompetitionProblem />}
            />
            {/* <Route index element={<Navigate replace to="/" />} /> */}

            <Route path="/problems" element={<ProblemList />} />
            <Route path="/problem/search" element={<Problem />} />
            <Route path="/admin/*" element={<Admin />} />

            <Route path="/compiler" element={<Compiler />} />
            <Route path="/competition/:id" element={<Competition />} />

            <Route path="/competitions" element={<Competitions />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/analytics" element={<Analytics />} />

            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route index element={<Navigate replace to="/signin" />} />
            <Route path="/signin" element={<SignIn />} />

            <Route path="/signup" element={<SignUp />} />

            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </>
      )}
    </React.Fragment>
  );
}

export default App;
