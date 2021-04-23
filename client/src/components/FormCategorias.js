import React, { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

function FormCategorias({ obtenerCategorias }) {
    //useState para nombre_categoria
    const [nombre_categoria, setNombre_categoria] = useState("");

    //Crear categoria.
    async function crearCategoria(e) {
        e.preventDefault();
        try {
            // Validación de input
            if (nombre_categoria.length === 0) {
                return swal("Error", "Revisa los campos requeridos", "warning");
            } else {
                const nueva_categoria = {
                    nombre_categoria
                }
                await axios.post('http://localhost:4000/categorias', nueva_categoria);
                obtenerCategorias();
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
                    <h4 className="card-title">Crear Categoría</h4>
                    <input type="text" placeholder="Nombre" value={nombre_categoria} className="form-control" onChange={(event) => { setNombre_categoria(event.target.value) }} required></input>
                    <button className="btn btn-success mt-3" onClick={crearCategoria} type="submit">Crear registro</button>
                </div>
            </div>
        </div>
    )
}

export default FormCategorias
