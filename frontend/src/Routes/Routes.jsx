import { Route } from "react-router-dom"
import React from "react"
import Signup from "../Components/Signup"
import Login from "../Components/Login"
import Dashboard from "../Components/Dashboard"
import Ledger from "../Components/Ledger"
import Home from "../Components/Home"


function Routes(){
    return(
        <>
        <Route path="/" exact render={() => <Home/>} />
        <Route path = '/signup' render={() => <Signup/>} />
        <Route path = '/login' render={() => <Login/>} />
        <Route path = '/dashboard' render={() => <Dashboard/>} />
        <Route path = '/ledger' render={() => <Ledger/>} />
        </>
    )
}
export  default Routes