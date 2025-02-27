import React from "react";
import "./loader.scss";
import { Spinner } from "reactstrap";
import loaderImage from "../../assets/images/idp.png"; // Asegúrate de que la ruta sea correcta

const Loader = ({ active }) => {
  if (!active) {
    return null; // Si no está activo, no renderiza nada
  }

  return (
    <div className="fallback-spinner">
      <div className="loading">
        <Spinner style={{ width: '120px', height: '120px', color: '#05318a' }} />
        <img src={loaderImage} alt="Cargando..." className="loader-image" />
      </div>
    </div>
  );
};

export default Loader;