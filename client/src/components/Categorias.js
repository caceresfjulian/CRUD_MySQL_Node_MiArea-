import React, { useEffect, useState } from 'react'
import FormCategorias from './FormCategorias'
import ListaCategorias from './ListaCategorias'
import axios from 'axios';

function Categorias() {
    
    //useState para la lista de categorías.
    const [listaCategorias, setListaCategorias] = useState([]);

    //Obtenemos las categorías existentes y organizamos su contenido por id de forma descendente.
    async function obtenerCategorias() {
        const categorias = await axios.get('http://localhost:4000/api/categorias');
        categorias.data.sort( function(x, y) {
            return x.id - y.id;
        });
        setListaCategorias(categorias.data)
    }

    //Solicitud de categorias al cargar componente.
    useEffect(() => {
        obtenerCategorias();
    }, []);


    // Pasar lista a componentes hijos, función solicitar categorias al form.
    return (
        <div className="">
            <FormCategorias obtenerCategorias={obtenerCategorias} />
            <ListaCategorias listaCategorias={listaCategorias} obtenerCategorias={obtenerCategorias}/>
        </div>
    )
}

export default Categorias
