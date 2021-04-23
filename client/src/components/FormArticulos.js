import React, { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

function FormArticulos({obtenerArticulos}) {
    //useState para input de artículo.
    const [numero_registro, setNumero_registro] = useState(0);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    //Crear artículo.
    async function crearArticulo(e) {
        e.preventDefault();
        try {
            // Validación de input
            if (numero_registro === 0 || nombre.length === 0 || descripcion.length === 0  ) {
                return swal("Error", "Revisa los campos requeridos", "warning");
            } else {
                const nuevo_articulo = {
                    numero_registro, nombre, descripcion
                }
                await axios.post('http://localhost:4000/articulos', nuevo_articulo);
                obtenerArticulos();
            }

        } catch (error) {
            console.error(error)
        }
    }

    //Forma asociada a su hook correspondiente.
    return (
        <div className="d-flex justify-content-center">
            <div className="card shadow w-50 mt-3">
                <div className="card-body">
                    <h4 className="card-title">Crear Artículo</h4>
                    <input type="number" placeholder="Número de registro" value={numero_registro} className="form-control my-3" onChange={(event) => { setNumero_registro(event.target.value) }} ></input>
                    <input type="text" placeholder="Nombre" value={nombre} className="form-control my-3" onChange={(event) => { setNombre(event.target.value) }} ></input>
                    <input type="text" placeholder="Descripción" value={descripcion} className="form-control my-3" onChange={(event) => { setDescripcion(event.target.value) }} ></input>
                    <button className="btn btn-success mt-3" onClick={crearArticulo} type="submit">Crear artículo</button>
                </div>
            </div>
        </div>
    )
}

export default FormArticulos
