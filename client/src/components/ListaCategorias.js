import React, { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'


function ListaCategorias({ listaCategorias, obtenerCategorias }) {

    //State para controlar la categoría.
    const [nuevaCategoria, setnuevaCategoria] = useState("");

    //Actualizar categoria.
    async function actualizarCategoria(id) {
        // Validación de input
        if (nuevaCategoria.length === 0) {
            return swal("Error", "Revisa los campos requeridos", "warning");
        } else {
            await axios.put('http://localhost:4000/categorias', {
                id: id,
                nombre_categoria: nuevaCategoria
            });
            setnuevaCategoria("");
            obtenerCategorias();
        }
    }

    //Borrar categoria.
    async function borrarCategoria(id) {
        await axios.delete(`http://localhost:4000/categorias/${id}`);
        obtenerCategorias();
    };

    return (
            <div className="d-flex row justify-content-center mt-5">
                {listaCategorias.map((categoria, key) => {
                    return <div key={key} className="card shadow col-3 m-2 align-selft-start">
                        <div className="card-body">
                            <h5 className="card-title d-inline">{categoria.nombre_categoria}</h5>
                            <span className="badge badge-pill badge-danger m-2">{categoria.id}</span>
                            <input type="text" placeholder="Nueva categoría" className="form-control" onChange={(event) => { setnuevaCategoria(event.target.value) }} ></input>
                            <button className="btn btn-primary mt-3 mr-2" onClick={() => actualizarCategoria(categoria.id)}>Actualizar</button>
                            <button className="btn btn-danger mt-3 mr-2" onClick={() => borrarCategoria(categoria.id)}>Borrar</button>
                        </div>
                    </div>
                })}
            </div>
    )
}

export default ListaCategorias
