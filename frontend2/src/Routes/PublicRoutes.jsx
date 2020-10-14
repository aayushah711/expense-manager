import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Components/Home.jsx';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Posts from '../Components/Posts';
import Payment from '../Components/Payment';

export default function Routing(props) {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/posts" exact component={Posts} />
            <Route path="/payment" exact component={Payment} />
            <Route render={() => <h3>Page not found</h3>} />
        </Switch>
    );
}
