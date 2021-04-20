import React from 'react';
import StartPage from './StartPage';
import Warehouse from './Warehouse'
import Routes from "./Routes";
import {BrowserRouter} from "react-router-dom";

export default function App() {
    return(
        <BrowserRouter>
            <StartPage/>
            <Warehouse/>
            <Routes/>
        </BrowserRouter>


    );
}
