import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../../pages/Loader/Loader";
import { problemRoutes } from "./routes";

const ProblemRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {problemRoutes.problems.map(({ path, component: Component, exact }) => (
        <Route 
          key={path}
          path={path}
          element={<Component />}
        />
      ))}
    </Routes>
  </Suspense>
);

export { ProblemRoutes }; 