import React, {useEffect, useState} from 'react';
import Routes from "./Routes";
import {AppProvider} from '@shopify/polaris';

n
export default function App() {
    return(
        <AppProvider>
                <Routes/>
        </AppProvider>
    );
}
