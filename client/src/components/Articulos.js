import React, { useEffect, useState } from 'react'
import FormArticulos from './FormArticulos'
import ListaArticulos from './ListaArticulos'
import axios from 'axios';

function Articulos() {

    //useState para la lista de artículos.
    const [listaArticulos, setListaArticulos] = useState([]);

    //Obtenemos los artículos existentes y organizamos su contenido por id de forma descendente.
    async function obtenerArticulos() {
        const articulos = await axios.get('http://localhost:4000/api/articulos');
        articulos.data.sort(function (x, y) {
            return x.id - y.id;
        });
        setListaArticulos(articulos.data)
    }

    //Solicitud de artículos al cargar componente.
    useEffect(() => {
        obtenerArticulos();
    }, []);


    // Pasar lista a componentes hijos, función solicitar artículos al form.
    return (
        <div className="container">
            <FormArticulos obtenerArticulos={obtenerArticulos} />
            <ListaArticulos listaArticulos={listaArticulos} obtenerArticulos={obtenerArticulos} />
        </div>
    )
}

export default Articulos
