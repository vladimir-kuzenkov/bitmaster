import React, { Component } from "react";
import { Map as Maps, Placemark } from 'react-yandex-maps';
import { connect } from "react-redux";

import {
    ymapsLoaded,
    uncheckedCoordsChanged
} from "../../../actions";

import YellowMarker from "../../../images/yellow-marker.png";
import RedMarker from "../../../images/red-marker.png";
import GreenMarker from "../../../images/green-marker.png";
import "./map.css";



class Map extends Component {
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.renderedCoords !== this.props.renderedCoords
            && this.props.renderedCoords)
        {
            this.myMap.panTo(this.props.renderedCoords);
        }
    }
    
    onMapClick(e) {
        if (this.props.orderCreated) {
            return
        }
        const coords = e.get('coords');
        this.props.uncheckedCoordsChanged(coords);
    }
    
    
    render() {
        
        const { renderedCoords, mapCenter, isValid, drivers } = this.props;
        let userPlacemark;
        let driversPlacemarks;
        
        
        if (renderedCoords) {
            userPlacemark =
                <Placemark geometry={renderedCoords}
                           options={{
                               iconLayout: 'default#image',
                               iconImageHref: isValid ? YellowMarker : RedMarker,
                               iconImageSize: [40, 45],
                               iconImageOffset: [-20, -45],
                           }}>
                </Placemark>
        }
        
        if (drivers) {
            driversPlacemarks = drivers.map((driver) => {
                return <Placemark geometry={[driver.lat, driver.lon]}
                                  key={driver.crew_id}
                                  options={{
                                      iconLayout: 'default#image',
                                      iconImageHref: GreenMarker,
                                      iconImageSize: [40, 45],
                                      iconImageOffset: [-20, -45],
                                  }}>
                        </Placemark>
            })
        }
        
        
        return (
            <Maps className="map" state={{ center: mapCenter, zoom: 13 }}
                  instanceRef={(inst) => this.myMap = inst}
                  modules={['geocode']}
                  onLoad={(ymaps) => this.props.ymapsLoaded(ymaps)}
                  onClick={(e) => this.onMapClick(e)}>
                
                {userPlacemark}
                {driversPlacemarks}
                
            </Maps>
        );
    }
}


const mapStateToProps = ({ renderedCoords, mapCenter, isValid, drivers, orderCreated }) => {
    return { renderedCoords, mapCenter, isValid, drivers, orderCreated }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ymapsLoaded: (ymaps) => dispatch(ymapsLoaded(ymaps)),
        uncheckedCoordsChanged: (coords) => dispatch(uncheckedCoordsChanged(coords))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Map);
