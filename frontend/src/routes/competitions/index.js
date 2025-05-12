import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../../pages/Loader/Loader";
import { competitionRoutes } from "./routes";

const CompetitionRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {competitionRoutes.competitions.map(({ path, component: Component, exact }) => (
        <Route 
          key={path}
          path={path}
          element={<Component />}
        />
      ))}
    </Routes>
  </Suspense>
);

export { CompetitionRoutes }; 