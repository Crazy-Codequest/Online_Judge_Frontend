import { lazy } from "react";

const Home = lazy(() => import("../../pages/Home"));
const Admin = lazy(() => import("../../pages/Admin"));
const Compiler = lazy(() => import("../../pages/Compiler"));
const ProfilePage = lazy(() => import("../../pages/Profile"));
const Analytics = lazy(() => import("../../pages/Analytics"));

export const mainRoutes = {
  main: [
    {
      path: "/",
      component: Home,
      exact: true
    },
    {
      path: "/admin/*",
      component: Admin,
      exact: false
    },
    {
      path: "/compiler",
      component: Compiler,
      exact: true
    },
    {
      path: "/profile",
      component: ProfilePage,
      exact: true
    },
    {
      path: "/analytics",
      component: Analytics,
      exact: true
    }
  ]
}; 