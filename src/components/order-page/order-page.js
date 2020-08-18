import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import AddressForm from "../order-components/address-form";
import SuitableDriver from "../order-components/suitable-driver-info";
import Map from "../order-components/map";
import ListOfDrivers from "../order-components/list-of-drivers";
import OrderButton from "../order-components/order-button";
import Spinner from "../spinner";

import "./order-page.css";



class OrderPage extends Component {
    
    render() {
        return (
            <Fragment>
                <div className="order-page__wrapper">
                    <h1 className="order-page__headline">Детали заказа</h1>
                    <AddressForm />
    
                </div>
                <div className="order-page__map-wrapper">
                    {
                        this.props.loadingMap ? <Spinner /> : null
                    }
                    <Map />
                </div>
                <div className="order-page__wrapper">
                    <div className="order-page__driver-wrapper">
                        <SuitableDriver />
                        <ListOfDrivers />
                    </div>
                </div>
                <div className="order-page__wrapper">
                    <OrderButton />
                </div>
            </Fragment>
        );
    }
}


const mapStateToProps = ({ loadingMap }) => {
    return { loadingMap }
};


export default connect(mapStateToProps)(OrderPage);
