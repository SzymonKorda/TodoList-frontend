import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import UserContextProvider from "./store/UserContextProvider";

ReactDOM.render(
    <React.StrictMode>
        <UserContextProvider>
            <App/>
        </UserContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
