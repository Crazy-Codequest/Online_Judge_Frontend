import { Routes, Route } from "react-router-dom";
import Navbar from "../pages/Navbar";
import { ProblemRoutes } from "./problems";
import { CompetitionRoutes } from "./competitions";
import { MainRoutes } from "./main";
import { PublicRoutes } from "./auth";

export const AuthenticatedRoutes = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/problems/*" element={<ProblemRoutes />} />
      <Route path="/competitions/*" element={<CompetitionRoutes />} />
      <Route path="/statement/*" element={<CompetitionRoutes />} />
      <Route path="/*" element={<MainRoutes />} />
    </Routes>
  </>
);

export { PublicRoutes }; 