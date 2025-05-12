import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../../pages/Loader/Loader";
import { mainRoutes } from "./routes";

const MainRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {mainRoutes.main.map(({ path, component: Component, exact }) => (
        <Route 
          key={path}
          path={path}
          element={<Component />}
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export { MainRoutes }; 