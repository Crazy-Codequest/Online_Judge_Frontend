import { lazy } from "react";
import Navbar from "../pages/Navbar";
import { Outlet } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Admin = lazy(() => import("../pages/Admin"));
const Compiler = lazy(() => import("../pages/Compiler"));
const ProfilePage = lazy(() => import("../pages/Profile"));
const Analytics = lazy(() => import("../pages/Analytics"));

const ProblemList = lazy(() => import("../pages/Problems"));
const Problem = lazy(() => import("../pages/Problems/Problem"));
const StatementPage = lazy(() => import("../pages/StatementPage"));

const Competitions = lazy(() => import("../pages/Competitions"));
const Competition = lazy(() => import("../pages/Competitions/Competition"));
const CompetitionProblem = lazy(() => import("../pages/Competitions/Problems/Statement"));

export const AuthenticatedLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export const authenticatedRoutes = [
  {
    element: <AuthenticatedLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => {
          return null;
        }
      },
      {
        path: "/admin/*",
        element: <Admin />
      },
      {
        path: "/compiler",
        element: <Compiler />
      },
      {
        path: "/profile",
        element: <ProfilePage />
      },
      {
        path: "/analytics",
        element: <Analytics />
      },

      {
        path: "/problems",
        element: <ProblemList />,
        loader: async () => {
          return null;
        }
      },
      {
        path: "/problems/search",
        element: <Problem />
      },
      {
        path: "/problems/statement/:id",
        element: <StatementPage />,
        loader: async ({ params }) => {
          return null;
        }
      },

      {
        path: "/competitions",
        element: <Competitions />,
        loader: async () => {
          return null;
        }
      },
      {
        path: "/competitions/:id",
        element: <Competition />,
        loader: async ({ params }) => {
          return null;
        }
      },
      {
        path: "/competitions/:c_id/statement/:id",
        element: <CompetitionProblem />,
        loader: async ({ params }) => {
          return null;
        }
      },

      {
        path: "/statement/*",
        element: <CompetitionProblem />
      }
    ]
  }
]; 