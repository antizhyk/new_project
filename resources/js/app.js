require('./bootstrap');
require('alpinejs');

import React from 'react';
import ReactDOM from 'react-dom';
import '@shopify/polaris/dist/styles.css';
import App from './Application/App'
import { BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.querySelector('#root')
);
