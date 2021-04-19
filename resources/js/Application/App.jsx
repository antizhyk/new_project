import React from 'react';
import Header from './Header/Header';
import Tab from './Tab/Tab';
import {AppProvider} from '@shopify/polaris';

export default function App() {
return(
        <AppProvider >
            <div className={'block__main'}>
                <div className={'block__header'}>
                    <Header/>
                </div>

                <Tab/>
            </div>

        </AppProvider>


);
}
