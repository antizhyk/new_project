import React from 'react';
import AddProduct from './AddProduct';
import {AppProvider} from '@shopify/polaris';

export default function App() {
return(
        <AppProvider >
            <div className={'block__main'}>
            <AddProduct/>
            </div>

        </AppProvider>


);
}
