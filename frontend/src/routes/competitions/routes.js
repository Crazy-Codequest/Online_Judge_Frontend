import { lazy } from "react";

const Competitions = lazy(() => import("../../pages/Competitions"));
const Competition = lazy(() => import("../../pages/Competitions/Competition"));
const CompetitionProblem = lazy(() => import("../../pages/Competitions/Problems/Statement"));

export const competitionRoutes = {
    competitions: [
        {
            path: "/",
            component: Competitions,
            exact: true
        },
        {
            path: "/:id",
            component: Competition,
            exact: true
        },
        {
            path: "/:c_id/statement/:id",
            component: CompetitionProblem,
            exact: true
        }
    ]
}