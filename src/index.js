import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import UserContextProvider from "./store/UserContextProvider";
import {ToastContainer} from "react-toastify";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserContextProvider>
                <App/>
            </UserContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
