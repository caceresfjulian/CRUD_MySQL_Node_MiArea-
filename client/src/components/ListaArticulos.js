import React, { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'


function ListaArticulos({ listaArticulos, obtenerArticulos }) {
    //State para controlar el input del nuevo articulo.
    const [nuevo_numero_registro, setnuevo_numero_registro] = useState(0);
    const [nuevo_nombre, setnuevo_nombre] = useState("");
    const [nuevo_descripcion, setnuevo_descripcion] = useState("");

    //Actualizar categoria.
    async function actualizarArticulo(id) {
        // Validación de input
        if (nuevo_numero_registro === 0 || nuevo_nombre.length === 0 || nuevo_descripcion.length === 0) {
            return swal("Error", "Revisa los campos requeridos", "warning");
        } else {
            await axios.put('http://localhost:4000/articulos', {
                id: id,
                numero_registro: nuevo_numero_registro,
                nombre: nuevo_nombre,
                descripcion: nuevo_descripcion
            });
            setnuevo_numero_registro(0);
            setnuevo_nombre("");
            setnuevo_descripcion("");
            obtenerArticulos();
        }
    }

    //Borrar artículo.
    async function borrarArticulo(id) {
        await axios.delete(`http://localhost:4000/articulos/${id}`);
        obtenerArticulos();
    };

    return (
        <div className="d-flex row justify-content-center mt-5">
            {listaArticulos.map((articulo, key) => {
                return <div key={key} className="card shadow col-3 m-2 align-selft-start">
                    <div className="card-body justify-content-center">
                        <span className="badge badge-secondary">{articulo.numero_registro}</span>
                        <h5 className="card-title d-inline mx-1">{articulo.nombre}</h5>
                        <p className="card-text">{articulo.descripcion}</p>
                        <span className="badge badge-pill badge-danger m-2">{articulo.id}</span>
                        <input type="number" placeholder="Nuevo número de registro" className="form-control my-2" onChange={(event) => { setnuevo_numero_registro(event.target.value) }} ></input>
                        <input type="text" placeholder="Nuevo nombre" className="form-control my-2" onChange={(event) => { setnuevo_nombre(event.target.value) }} ></input>
                        <input type="text" placeholder="Nueva descripcion" className="form-control my-2" onChange={(event) => { setnuevo_descripcion(event.target.value) }} ></input>
                        <button className="btn btn-primary mt-3 mr-2" onClick={() => actualizarArticulo(articulo.id)}>Actualizar</button>
                        <button className="btn btn-danger mt-3 mr-2" onClick={() => borrarArticulo(articulo.id)}>Borrar</button>
                    </div>
                </div>
            })}
        </div>
    )
}

export default ListaArticulos
