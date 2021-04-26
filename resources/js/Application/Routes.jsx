import React from "react";
import {Route, Switch} from 'react-router-dom';
import Warehouse from './Warehouse';
import Forms from './Form/Forms';
import FormsRegister from './Form/FormsRegister';

const Routes = () =>{
    return(
        <Switch>
            <Route component={FormsRegister} path="/register" />
            <Route component={Forms} path="/login" />
            <Route component={Warehouse} path="/" exact/>
        </Switch>
    )
}

export default Routes;
