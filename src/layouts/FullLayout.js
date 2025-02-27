import { Outlet, useLocation, useRoutes, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Container } from "reactstrap";

/***** Componentes de Rutas *****/
import Starter from "../views/Starter";
import About from "../views/About";
import Alerts from "../views/ui/Alerts";
import Badges from "../views/ui/Badges";
import Buttons from "../views/ui/Buttons";
import Cards from "../views/ui/Cards";
import Grid from "../views/ui/Grid";
import Forms from "../views/ui/Forms";
import Breadcrumbs from "../views/ui/Breadcrumbs";
import Login from "../components/login/login";
import ProjectTables from "../components/dashboard/ProjectTable";
import TablaDirectivaLocal from "../components/directivaLocal/tablaDirectivaLocal";
import TablaRegistrarIglesia from "../components/iglesiasxzona/registrarIglesia";
import TablaDirectivaZonal from "../components/directivaZonal/tablaDirectivaZonal";

const FullLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login"; // Verifica si estás en la página de login

  // Definición de rutas usando useRoutes
  const routes = useRoutes([
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "/starter", element: <Starter /> },
    { path: "/about", element: <About /> },
    { path: "/alerts", element: <Alerts /> },
    { path: "/badges", element: <Badges /> },
    { path: "/buttons", element: <Buttons /> },
    { path: "/cards", element: <Cards /> },
    { path: "/grid", element: <Grid /> },
    { path: "/registrojoyas", element: <ProjectTables /> },
    { path: "/directivajslocal", element: <TablaDirectivaLocal /> },
    { path: "/directivajszonal", element: <TablaDirectivaZonal /> },
    { path: "/registrariglesia", element: <TablaRegistrarIglesia /> },
    { path: "/forms", element: <Forms /> },
    { path: "/breadcrumbs", element: <Breadcrumbs /> },
    { path: "/login", element: <Login /> },
  ]);

  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/******** Sidebar **********/}
        {!isLoginPage && (
          <aside className="sidebarArea shadow" id="sidebarArea">
            <Sidebar />
          </aside>
        )}
        
        {/******** Content Area **********/}
        <div
          className="w-100 p-4 m-0 py-0 mx-auto"
          style={{ height: "85dvh", overflow: "auto" }}
        >
          <Container className="p-4" fluid>
            {routes}
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
