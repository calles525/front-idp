import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../layouts/loader/Loader";
import md5 from "md5"; // Importa md5

const Login = () => {
    const op = require('../../assets/nodulo/datos')
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [activate, setActivate] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
console.log(op.conexion)
    const handleLogin = async (e) => {
        e.preventDefault();
        setActivate(true);
        setError("");

        try {
            const response = await fetch(op.conexion+"/api/login/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usuario,
                    contrasena,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.data[0].resultado);

                sessionStorage.setItem('tokens', md5(result.data[0].resultado.usuario.login));
                if (result.data[0].resultado.usuario.nivel.toString() === 'local') {

                    sessionStorage.setItem('nombreiglesia', result.data[0].resultado.iglesia.nombre);
                    sessionStorage.setItem('idiglesia', result.data[0].resultado.iglesia.idIglesia);
                    sessionStorage.setItem('idusuario', result.data[0].resultado.usuario.idUsuario);
                    sessionStorage.setItem('login', result.data[0].resultado.usuario.login);
                    sessionStorage.setItem('nivel', result.data[0].resultado.usuario.nivel);

                } else if (result.data[0].resultado.usuario.nivel.toString() === 'zonal'){

                    sessionStorage.setItem('nombrezona', result.data[0].resultado.zona.nombre);
                    sessionStorage.setItem('idzona', result.data[0].resultado.zona.idZona);
                    sessionStorage.setItem('idusuario', result.data[0].resultado.usuario.idUsuario);
                    sessionStorage.setItem('login', result.data[0].resultado.usuario.login);
                    sessionStorage.setItem('nivel', result.data[0].resultado.usuario.nivel);

                }
                // Redirige al usuario a /starter
                navigate("/starter");
            } else {
                const errorMsg = await response.text();
                setError(errorMsg || "Error en las credenciales");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            setError("Error en la conexión al servidor");
        } finally {
            setActivate(false);
        }
    };

    return (
        <div>
            <Loader active={activate} />
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-5">
                                <h5 className="card-title text-center mb-5 fw-light fs-5">Bienvenido</h5>
                                <form onSubmit={handleLogin}>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Usuario"
                                            value={usuario}
                                            onChange={(e) => setUsuario(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="floatingInput">Usuario</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder="Contraseña"
                                            value={contrasena}
                                            onChange={(e) => setContrasena(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="floatingPassword">Contraseña</label>
                                    </div>

                                    {error && <div className="alert alert-danger" role="alert">{error}</div>}

                                    <div className="d-grid">
                                        <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">
                                            Iniciar sesión
                                        </button>
                                    </div>
                                    <hr className="my-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
