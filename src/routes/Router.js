import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProjectTables from "../components/dashboard/ProjectTable.js";
import TablaDirectivaLocal from "../components/directivaLocal/tablaDirectivaLocal.js";
import TablaRegistrarIglesia from "../components/iglesiasxzona/registrarIglesia.js";
import TablaDirectivaZonal from "../components/directivaZonal/tablaDirectivaZonal.js";
/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));

const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const Login = lazy(() => import("../components/login/login"));


/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/registrojoyas", exact: true, element: <ProjectTables /> },
      { path: "/directivajslocal", exact: true, element: <TablaDirectivaLocal /> },
      { path: "/directivajszonal", exact: true, element: <TablaDirectivaZonal /> },
      { path: "/registrariglesia", exact: true, element: <TablaRegistrarIglesia /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/login", exact: true, element: <Login /> },

    ],
  },
];

export default ThemeRoutes;
