import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../../pages/Loader/Loader";
import { authRoutes } from "./routes";

const PublicRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {authRoutes.public.map(({ path, component: Component, exact }) => (
        <Route 
          key={path}
          path={path}
          element={<Component />}
        />
      ))}
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  </Suspense>
);

export { PublicRoutes }; 