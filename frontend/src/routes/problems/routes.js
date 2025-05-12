import { lazy } from "react";

const ProblemList = lazy(() => import("../../pages/Problems"));
const Problem = lazy(() => import("../../pages/Problems/Problem"));
const StatementPage = lazy(() => import("../../pages/StatementPage"));

export const problemRoutes = {
  problems: [
    { 
      path: "/", 
      component: ProblemList,
      exact: true
    },
    { 
      path: "/search", 
      component: Problem,
      exact: true
    },
    { 
      path: "/statement/:id", 
      component: StatementPage,
      exact: true
    }
  ]
}; 