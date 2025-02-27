import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../assets/images/idp.png";
import probg from "../assets/images/bg/download.jpg";
import { useEffect, useState } from "react";


const Sidebar = () => {

  const nivel = sessionStorage.getItem("nivel") || ""; // Proveer un valor por defecto si es null
  const login = sessionStorage.getItem("login") || ""; // Proveer un valor por defecto si es null
  const [nombre, setNombre] = useState("");
  
  console.log("Nivel:", nivel);
  
  useEffect(() => {
    // Obtener el nivel nuevamente en el efecto (aunque ya lo tienes arriba)
    const nivelActual = sessionStorage.getItem("nivel") || "";
  
    // Validar y asignar el nombre dependiendo del nivel
    const nombre =
      nivelActual === "local"
        ? sessionStorage.getItem("nombreiglesia") || "Iglesia no identificada"
        : sessionStorage.getItem("nombrezona") || "Zona no identificada";
  
    setNombre(nombre);
  }, []);


  let location = useLocation();


  return (
    <div>
      <div className="d-flex align-items-center"></div>
      <div
        className="profilebg"
        style={{ background: `url(${probg}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <img src={user1} alt="user" width="50" className="rounded-circle" />

        </div>
        <div className="bg-dark text-white px-2 mt-2 opacity-75">{login}</div>
        <div className="bg-dark text-white px-2 mb-2 opacity-75">{nombre}</div>

      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">

          <NavItem className="sidenav-bg">
            <Link
              to='/starter'
              className={
                location.pathname === '/starter'
                  ? "active nav-link py-3"
                  : "nav-link text-secondary py-3"
              }
            >
              <i className='bi bi-speedometer2'></i>
              <span className="ms-3 d-inline-block">Dashboard</span>
            </Link>
          </NavItem>
          {nivel.toString() === 'local' ? <NavItem className="sidenav-bg">
            <Link
              to='/registrojoyas'
              className={
                location.pathname === '/registrojoyas'
                  ? "active nav-link py-3"
                  : "nav-link text-secondary py-3"
              }
            >
              <i className='bi bi-layout-split'></i>
              <span className="ms-3 d-inline-block">Registro de JC local</span>
            </Link>
          </NavItem> : ''}
          {nivel.toString() === 'local' ? <NavItem className="sidenav-bg">
            <Link
              to='/directivajslocal'
              className={
                location.pathname === '/directivajslocal'
                  ? "active nav-link py-3"
                  : "nav-link text-secondary py-3"
              }
            >
              <i className='bi bi-layout-split'></i>
              <span className="ms-3 d-inline-block">Directiva JC local</span>
            </Link>
          </NavItem> : ''}
          {nivel.toString() === 'zonal' ? <NavItem className="sidenav-bg">
            <Link
              to='/registrariglesia'
              className={
                location.pathname === '/registrariglesia'
                  ? "active nav-link py-3"
                  : "nav-link text-secondary py-3"
              }
            >
              <i className='bi bi-layout-split'></i>
              <span className="ms-3 d-inline-block">Registrar Iglesia</span>
            </Link>
          </NavItem> : ''}
          {nivel.toString() === 'zonal' ? <NavItem className="sidenav-bg">
            <Link
              to='/directivajszonal'
              className={
                location.pathname === '/directivajszonal'
                  ? "active nav-link py-3"
                  : "nav-link text-secondary py-3"
              }
            >
              <i className='bi bi-layout-split'></i>
              <span className="ms-3 d-inline-block">Registrar Directiva</span>
            </Link>
          </NavItem> : ''}

          <Button
            color="danger"
            tag="a"

            className="mt-3"
            href="/login"
          >
            Salir
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
