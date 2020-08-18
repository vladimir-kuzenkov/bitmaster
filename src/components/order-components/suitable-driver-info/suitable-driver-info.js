import React, { Component, Fragment } from "react";
import {connect} from "react-redux";

import Spinner from "../../spinner";

import "./suitable-driver-info.css";



class SuitableDriver extends Component {
    
    render() {
        
        let { suitableDriver, driversLoading } = this.props;
        
        const nullDriver = {
            "car_mark":"-",
            "car_model":"",
            "car_color":"-",
            "car_number":"-",
        };
        
        let renderedDriver = suitableDriver ? suitableDriver : nullDriver;
        
        const driver =
            <Fragment>
                <h2 className="suitable-driver__headline">{suitableDriver ? "Подходящий экипаж" : "Введите адрес"}</h2>
                <div className="suitable-driver__container">
                    <div className="suitable-driver__icon" />
                    <div className="suitable-driver__info">
                        <h3 className="suitable-driver__car-model">
                            {renderedDriver.car_mark}
                            {renderedDriver.car_model}
                        </h3>
                        <span className="suitable-driver__car-color">
                            {renderedDriver.car_color}
                        </span>
                        <span className="suitable-driver__car-number">
                            {renderedDriver.car_number}
                        </span>
                    </div>
                </div>
            </Fragment>;
        
        const content = driversLoading ? <Spinner /> : driver;
        
        
        return (
            <section className="suitable-driver">
                {content}
            </section>
        );
    }
}


const mapStateToProps = ({ suitableDriver, driversLoading }) => {
    return { suitableDriver, driversLoading }
};


export default connect(mapStateToProps)(SuitableDriver);
