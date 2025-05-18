import { createBrowserRouter, redirect, useNavigate, Navigate } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import Navbar from "./pages/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./features/auth/authSlice";
import ForgotPassword from "./pages/Login/forgot-password";

const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./pages/Login/Login"));
const SignUp = lazy(() => import("./pages/Login/Signup"));
const ProblemList = lazy(() => import("./pages/Problems"));
const Problem = lazy(() => import("./pages/Problems"));
const StatementPage = lazy(() => import("./pages/StatementPage"));
const Competitions = lazy(() => import("./pages/Competitions"));
const Competition = lazy(() => import("./pages/Competitions/Competition"));
const CompetitionProblem = lazy(() => import("./pages/Competitions/Problems/Statement"));
const Admin = lazy(() => import("./pages/Admin"));
const Compiler = lazy(() => import("./pages/Compiler"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const Analytics = lazy(() => import("./pages/Analytics"));

const getUserFromStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const PublicLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const AuthenticatedLayout = () => {
  const { user: reduxUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser && reduxUser) {
      dispatch(logout());
      navigate('/signin');
    }
  }, [reduxUser, navigate, dispatch]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
        loader: () => {
          const user = getUserFromStorage();
          return user ? redirect("/") : null;
        }
      },
      {
        path: "signup",
        element: <SignUp />,
        loader: () => {
          const user = getUserFromStorage();
          return user ? redirect("/") : null;
        }
      },   
      {
        path: "forgot-password",
        element: <ForgotPassword />,
        loader: () => {
          const user = getUserFromStorage();
          return user ? redirect("/") : null;
        }
      },
      {
        path: "*",
        loader: () => {
          const user = getUserFromStorage();
          return user ? redirect("/") : null;
        },
        element: <Navigate to="/signin" replace />
      }
    ]
  },
  {
    path: "/",
    element: <AuthenticatedLayout />,
    loader: () => {
      const user = getUserFromStorage();
      return !user ? redirect("/signin") : null;
    },
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "problems",
        children: [
          {
            index: true,
            element: <ProblemList />
          },
          {
            path: "search",
            element: <Problem />
          },
          {
            path: "statement/:id",
            element: <StatementPage />
          }
        ]
      },
      {
        path: "competitions",
        children: [
          {
            index: true,
            element: <Competitions />
          },
          {
            path: ":id",
            element: <Competition />
          },
          {
            path: ":c_id/statement/:id",
            element: <CompetitionProblem />
          }
        ]
      },
      {
        path: "statement/*",
        element: <CompetitionProblem />
      },
      {
        path: "admin/*",
        element: <Admin />
      },
      {
        path: "compiler",
        element: <Compiler />
      },
      {
        path: "profile",
        element: <ProfilePage />
      },
      {
        path: "analytics",
        element: <Analytics />
      },
      {
        path: "*",
        element: <Navigate to="/" replace />
      }
    ]
  }
]); 