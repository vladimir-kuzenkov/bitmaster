import React from "react";
import { YMaps } from "react-yandex-maps";

import Header from "../header";
import CoordsHandler from "../coords-handler";
import OrderPage from "../order-page";
import Footer from "../footer";

import MyApiKey from "../../myApiKey";
import "./app.css";



const App = () => {
    return (
        <YMaps query={{apikey: MyApiKey}}>
            <Header />
            <main>
                <CoordsHandler />
                <OrderPage />
            </main>
            <Footer />
        </YMaps>
    )
};


export default App;
