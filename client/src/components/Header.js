import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <h3>CRUD MiArea</h3>
                <Link className="nav-link" to="/categorias">Categorías</Link>
                <Link className="nav-link" to="/articulos">Artículos</Link>
            </div>
        </nav>
    )
}

export default Header
