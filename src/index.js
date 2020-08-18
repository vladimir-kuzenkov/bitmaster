import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import { DriversServiceProvider } from "./components/drivers-service-context";
import DriversService from "./services/drivers-service";
import App from "./components/app";

import store from "./store";


const driversService = new DriversService();

ReactDOM.render(
    <Provider store={store}>
        <DriversServiceProvider value={driversService}>
            <App />
        </DriversServiceProvider>
    </Provider>,
    document.getElementById('root')
);
