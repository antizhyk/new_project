require('./bootstrap');
import React from 'react';
import ReactDOM from 'react-dom';
import '@shopify/polaris/dist/styles.css';
import App from './Application/App'
ReactDOM.render(
    <div className={'block__big'}>
        <App/>
    </div>

   ,
    document.getElementById('root')
);
