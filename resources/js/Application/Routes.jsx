import React from "react";
import {Route, Switch} from 'react-router-dom';

const Routes = () =>{
    return(
        <Switch>
            <Route component="StartPage" path="/" exact/>
            <Route component="Warehouse" path="/warehouse" />
        </Switch>
    )
}

export default Routes;
