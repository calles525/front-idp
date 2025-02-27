import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Container } from "reactstrap";

const FullLayout = () => {
  const location = useLocation(); // Hook para obtener la ubicación actual
  const isLoginPage = location.pathname; // Verifica si estás en la página de login
console.log(location.pathname)
  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        {isLoginPage.toString() !== '/login' ? ( // Condicional para ocultar el Sidebar si estás en /login
          <aside className="sidebarArea shadow" id="sidebarArea">
            <Sidebar />
          </aside>
        ) : '' }
        {/********Content Area**********/}
        <div className="contentArea">
          {/********Middle Content**********/}
          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
