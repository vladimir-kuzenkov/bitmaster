import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../../spinner";

import "./list-of-drivers.css";



const DriverItem = ({ data }) => {
    return (
        <li className="driver">
            <div className="driver__icon" />
            <div className="driver__info">
                <h3 className="driver__car-model">
                    {data.car_mark + ' ' + data.car_model}
                </h3>
                <span className="driver__car-color">
                    {data.car_color}
                </span>
            </div>
            <span className="driver__distance">{data.distance}м</span>
        </li>
    
    )
};

export const List = ({ data, Component }) => {
    return (
        <ul className="list-of-drivers">
            {
                data.map((item) => {
                    return <Component data={item} key={item.crew_id} />
                })
            }
        </ul>
    )
};


class ListOfDrivers extends Component {
    
    render() {
        
        const { drivers, driversLoading } = this.props;
        
        const text = <span className="list-of-drivers__text">Тут будут показаны доступные водители</span>;
        const listOfDrivers = drivers ? <List Component={DriverItem} data={drivers} /> : text;
        
        let content = driversLoading ? <Spinner /> : listOfDrivers;
        
        return (
            <section className="list-of-drivers__wrapper">
                {content}
            </section>
        )
    }
}


const mapStateToProps = ({ drivers, driversLoading }) => {
    return { drivers, driversLoading }
};


export default connect(mapStateToProps)(ListOfDrivers);
