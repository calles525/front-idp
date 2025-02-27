import { Card, CardBody, CardTitle, CardSubtitle, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import moment from "moment";
import Loader from "../../layouts/loader/Loader";

const TablaDirectivaLocal = () => {
    const op = require('../../assets/nodulo/datos')

    const [data, setData] = useState([]); // Datos obtenidos del servidor
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [cargos, setCargos] = useState([]);
    const [mensage, setMensage] = useState('')
    const [mensage2, setMensage2] = useState('')

    // Estado para el modal
    const [modalOpen, setModalOpen] = useState(false);
    const [operacion, setOperacion] = useState(0); // 1: Incluir, 2: Modificar, 3: Eliminar, 4: Consultar
    const [operacionPer, setOperacionPer] = useState(0); // 1: Incluir, 2: Modificar, 
    // 3: Eliminar, 4: Consultar
    const [activate, setActivate] = useState(false)
    const [formData, setFormData] = useState({
        cedula: "",
        nacionalidad: "V", // Valor por defecto
        sexo: "M", // Valor por defecto
        nombre: "",
        apellido: "",
        fecha_nacimiento: "",

    });

    console.log(formData)

    const fetchData = async () => {
        setActivate(true)
        try {
            const response = await fetch(op.conexion+"/api/directivalocal/alldirectivos?iglesia=1");
            if (response.ok) {
                const result = await response.json();
                console.log("Datos obtenidos:", result); // Asegúrate de que los datos sean correctos
                setData(result);
            } else {
                console.error("Error al obtener los datos:", response.statusText);
            }
            setActivate(false)
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };
    const allCargos = async () => {
        setActivate(true)
        try {
            const response = await fetch(op.conexion+"/api/directivalocal/allcargos?sociedad=4&nivel='Local'");
            if (response.ok) {
                const result = await response.json();
                console.log("Datos obtenidos cargos:", result); // Asegúrate de que los datos sean correctos
                setCargos(result);
            } else {
                console.error("Error al obtener los datos:", response.statusText);
            }
            setActivate(false)
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };


    const onePersona = async () => {
       
        
        setActivate(true)
        try {
            const response = await fetch(op.conexion+"/api/persona/onepersona?cedula="+formData.cedula);
            if (response.ok) {
                const result = await response.json();
                console.log("Datos obtenidos de persona:", result[0]);
                if (!result[0]){
                    alert('No existe una persona con esa cedula porfavor registrar.')
                    formData.apellido = ''
                    formData.nombre = ''
                    formData.nacionalidad ='V'
                    formData.sexo ='M'
                    formData.fecha_nacimiento = ''
                    formData.id_persona = 0
                    setOperacionPer(1)
                } else{
                    setOperacionPer(0)

                    if (result[0].edad < 15){
                        alert('Esta persona no esta en edad para tener cargo')
                        formData.cedula = ''
                        formData.apellido = ''
                        formData.nombre = ''
                        formData.nacionalidad ='V'
                        formData.sexo ='M'
                        formData.fecha_nacimiento = ''
                        formData.id_persona = ''
                    } else {
                        formData.cedula = result[0].cedula
                        formData.apellido = result[0].apellido
                        formData.nombre = result[0].nombre
                        formData.nacionalidad = result[0].nacionalidad
                        formData.sexo = result[0].sexo
                        formData.fecha_nacimiento = result[0].fecha_nacimiento
                        formData.id_persona = result[0].id_persona
                      
                    }
                }
               
            } else {
                console.error("Error al obtener los datos:", response.statusText);
            }
            setActivate(false)
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const onePerson = () => {
        onePersona()
    }
    useEffect(() => {


        fetchData();
        allCargos();
    }, []);

    // Filtrar datos según el término de búsqueda
    const filteredData = data.filter((item) =>
        Object.values(item)
            .some((value) =>
                value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
    );

    // Paginación
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);
    const currentData = filteredData.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const goToPrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const goToNext = () => {
        if (currentPage < pageCount - 1) setCurrentPage(currentPage + 1);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(0); // Resetear a la primera página al cambiar la cantidad de elementos
    };

    // Abrir el modal y asignar la operación
    const openModal = (operation, item) => {
        setOperacion(operation);

        // Si la operación es "Modificar" o "Consultar", puedes cargar los datos correspondientes
        if (operation !== 1) {
            setFormData(item);
        } else {
            setFormData({
                cedula: "",
                nacionalidad: "V",
                sexo: "M",
                nombre: "",
                apellido: "",
                fecha_nacimiento: "",
            });
        }

        setModalOpen(true);

    };

    // Cerrar el modal
    const closeModal = () => {
        setModalOpen(false)
        fetchData()
        setMensage('')
        setMensage2('')

    };

    // Manejar el cambio de los valores del formulario
    const handleInputChange = (e) => {
        console.log(data)
        if (e.target.name === "id_cargo") {
            for (let i = 0; i < data.length; i++) {

                if (parseInt(e.target.value) === parseInt(data[i].id_cargo) && parseInt(data[i].id_persona) !== parseInt(formData.id_persona)) {

                    console.log(parseInt(data[i].id_persona), parseInt(formData.id_persona))
                    setMensage('este cargo no esta disponible')
                } else {
                    setMensage('')
                }
            }
        }
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Función para manejar el formulario según la operación
    const handleSubmit = async () => {

        setActivate(true)
        // Incluir
        try {
            const response = await fetch(op.conexion+"/api/directivalocal/registrardirectivo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    operacionper: operacionPer,
                    operacioncargo: operacion,
                    p_cedula: formData.cedula,
                    p_nacionalidad: formData.nacionalidad,
                    p_sexo: formData.sexo,
                    p_nombre: formData.nombre,
                    p_apellido: formData.apellido,
                    p_fecha_nacimiento: moment(formData.fecha_nacimiento).format('YYYY-MM-DD'),
                    p_id_iglesia: 1,
                    p_id_persona: formData.id_persona,
                    c_id_cargo: formData.id_cargo,
                    c_id_cargolocal: formData.id_directiva_local


                }),
            });

            console.log(response)

            if (response.status === 200) {

            } else {
                console.error("Error al incluir registro:", response.statusText);
            }

            closeModal();
            setActivate(false)
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }

    };
    return (
        <div>
            <Loader active={activate} />

            <Card>
                <CardBody>
                    <CardTitle tag="h5">Directiva Agua Blanca</CardTitle>

                    {/* Buscador y botón de agregar */}
                    <div className="d-flex mb-3">
                        <input
                            type="text"
                            placeholder="Buscar por cualquier campo..."
                            className="form-control"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-sm btn-success ms-2" onClick={() => openModal(1, '')}>
                            <i className="fas fa-plus"></i> {/* Icono de agregar */}
                        </button>
                    </div>

                    {/* Tabla */}
                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                            <tr>
                                <th className="text-center">Cargo</th>
                                <th className="text-center">Cedula</th>
                                <th className="text-center">Nombre y Apellido</th>

                                <th className="text-center">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item, index) => (
                                <tr key={index} className="border-top">
                                    <td>
                                        <div className="text-center">
                                            <h6 className="mb-0">{item.cargonom}</h6>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-center">
                                            <h6 className="mb-0">{item.cedula}</h6>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="text-center">
                                            <h6 className="mb-0">{item.nombre + " " + item.apellido}</h6>
                                        </div>
                                    </td>


                                    <td className="text-center">
                                        {/* Botones de opciones con iconos */}
                                        <button className="btn btn-sm btn-primary mx-1" onClick={() => openModal(2, item)}>
                                            <i className="fas fa-edit"></i> {/* Icono de editar */}
                                        </button>
                                        <button className="btn btn-sm btn-danger mx-1" onClick={() => openModal(3, item)}>
                                            <i className="fas fa-trash"></i> {/* Icono de eliminar */}
                                        </button>
                                        <button className="btn btn-sm btn-info mx-1" onClick={() => openModal(4, item)}>
                                            <i className="fas fa-eye"></i> {/* Icono de ver */}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Paginación y selector de elementos */}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div>
                            <label className="me-2">Items por página:</label>
                            <select
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                                className="form-select"
                                style={{ width: "100px", display: "inline-block" }}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                        <div>
                            <button
                                onClick={goToPrevious}
                                className="btn btn-primary mx-1"
                                disabled={currentPage === 0}
                            >
                                Anterior
                            </button>
                            {Array.from({ length: pageCount }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToPage(index)}
                                    className={`btn mx-1 ${currentPage === index ? "btn-success" : "btn-outline-primary"}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={goToNext}
                                className="btn btn-primary mx-1"
                                disabled={currentPage === pageCount - 1}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Modal */}
            <Modal isOpen={modalOpen} toggle={closeModal}>
                <ModalHeader toggle={closeModal}>
                    {operacion === 1
                        ? "Incluir"
                        : operacion === 2
                            ? "Modificar"
                            : operacion === 3
                                ? "Eliminar"
                                : "Consultar"}
                </ModalHeader>
                <ModalBody>

                    <Row>
                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Cargo:</span>
                            <select disabled={operacion === 4} id="cargos" name="id_cargo" onChange={handleInputChange} value={formData.id_cargo} className="text-uppercase form-control">
                                <option value="" disabled selected>
                                    -- Seleccione una opción --
                                </option>
                                {cargos.map((cargo) => (
                                    <option key={cargo.id_cargo} value={cargo.id_cargo}>
                                        {cargo.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {mensage !== '' ?
                            <div>
                                <div class="alert alert-danger" role="alert">
                                    {mensage}
                                </div>
                            </div> : ''}
                        <Col md={6}>
                            <Label for="cedula">Cédula</Label>
                            <Input
                                type="text"
                                id="cedula"
                                name="cedula"
                                value={formData.cedula}
                                onChange={handleInputChange}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        onePerson()
                                    }
                                }}
                                onBlur={onePerson}
                                disabled={operacion === 4} // Consultar no permite modificar
                            />
                        </Col>
                        <Col md={6}>
                            <Label for="nacionalidad">Nacionalidad</Label>
                            <Input
                                type="select"
                                id="nacionalidad"
                                name="nacionalidad"
                                value={formData.nacionalidad.toString()}
                                onChange={handleInputChange}
                                disabled={operacion === 4} // Consultar no permite modificar
                            >
                                <option value="V">Venezolano</option>
                                <option value="E">Extranjero</option>
                            </Input>
                        </Col>
                    </Row>
                    <Row className="mt-3">

                        <Col md={12}>
                            <Label for="nombre">Nombre</Label>
                            <Input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                disabled={operacion === 4} // Consultar no permite modificar
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={12}>
                            <Label for="apellido">Apellido</Label>
                            <Input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleInputChange}
                                disabled={operacion === 4} // Consultar no permite modificar
                            />
                        </Col>
                        <Col md={6}>
                            <Label for="sexo">Sexo</Label>
                            <Input
                                type="select"
                                id="sexo"
                                name="sexo"
                                value={formData.sexo.toString()}
                                onChange={handleInputChange}
                                disabled={operacion === 4} // Consultar no permite modificar
                            >
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </Input>
                        </Col>
                        <Col md={6}>
                            <Label for="fecha_nacimiento">Fecha de Nacimiento</Label>
                            <Input
                                type="date"
                                id="fecha_nacimiento"
                                name="fecha_nacimiento"
                                value={moment(formData.fecha_nacimiento).format('YYYY-MM-DD')}
                                onChange={handleInputChange}
                                disabled={operacion === 4} // Consultar no permite modificar
                                max={moment().format('YYYY-MM-DD')} // Fecha máxima hoy
                            />
                        </Col>´




                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>
                        {operacion === 1
                            ? "Incluir"
                            : operacion === 2
                                ? "Modificar"
                                : operacion === 3
                                    ? "Eliminar"
                                    : "Consultar"}
                    </Button>{" "}
                    <Button color="secondary" onClick={closeModal}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default TablaDirectivaLocal;
