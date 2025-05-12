import { lazy } from "react";

const SignIn = lazy(() => import("../../pages/Login/Login"));
const SignUp = lazy(() => import("../../pages/Login/Signup"));

export const authRoutes = {
  public: [
    {
      path: "/signin",
      component: SignIn,
      exact: true
    },
    {
      path: "/signup",
      component: SignUp,
      exact: true
    }
  ]
}; 