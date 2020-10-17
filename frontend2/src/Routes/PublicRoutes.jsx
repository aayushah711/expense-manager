import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Components/Home.jsx';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Ledger from '../Components/Ledger';

export default function Routing(props) {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/Ledger" exact component={Ledger} />
            <Route render={() => <h3>Page not found</h3>} />
        </Switch>
    );
}
