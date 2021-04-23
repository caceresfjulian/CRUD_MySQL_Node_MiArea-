import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Articulos from './components/Articulos'
import Categorias from './components/Categorias'
import Header from './components/Header'

function Router() {
    return (
        <BrowserRouter>
        <Header />
            <Switch>
                <Route path="/categorias" component={Categorias} />
                <Route path="/articulos" component={Articulos} />
                <Route path="*" component={Categorias}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Router
