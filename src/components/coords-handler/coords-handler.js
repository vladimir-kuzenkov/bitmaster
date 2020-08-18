import { Component } from "react";
import { connect } from "react-redux";

import compose from "../../utils/compose";
import { WithDriversService } from "../hoc";
import { Geocoder } from "../../utils";
import {
    uncheckedCoordsChanged,
    coordsSearchFailure,
    addressSearchFailure,
    addressSearchSuccess,
    fetchDrivers,
    fetchOrderCreation,
    fetchOrderCancel
} from "../../actions";



class CoordsHandler extends Component {
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        window.setTimeout(() => {
            if (prevProps.renderedAddress !== this.props.renderedAddress
                && this.props.renderedAddress && !this.props.isValid) {
                this.renderedAddressHandler();
            }
        }, 0);
        window.setTimeout(() => {
            if (prevProps.uncheckedCoords !== this.props.uncheckedCoords
                && this.props.uncheckedCoords) {
                this.tryGetAddress();
            }
        }, 0);
        window.setTimeout(() => {
            if (this.props.isValid && prevProps.validCoords !== this.props.validCoords) {
                const address = this.props.validAddress;
                const coords = this.props.validCoords;
                const coordsObj = { address, coords };
                this.props.fetchDrivers(coordsObj);
            }
        }, 0);
        window.setTimeout(() => {
            if (this.props.isValid && this.props.awaitingOrderRequest) {
                const address = this.props.validAddress;
                const coords = this.props.validCoords;
                const coordsObj = { address, coords };
                this.props.fetchOrderCreation(coordsObj, this.props.suitableDriver['crew_id']);
            }
        }, 0);
        window.setTimeout(() => {
            if (this.props.awaitingCancelRequest) {
                this.props.fetchOrderCancel(this.props.orderId);
            }
        }, 0);
    }
    
    checkStringError = (str) => {
        this.mapPrompt = {
            "empty": "Пожалуйста, введите адрес",
            "wrongFormat": "Неверный формат адреса"
        };
        const strLength = str.split(',').length;
        const leftHalf = str.split(',')[0];
        const rightHalf = str.split(',')[1];

        if (!str.trim()) {
            return "empty";
        }
        if (!Number.isFinite(parseInt(rightHalf)) || strLength > 2 || !leftHalf.trim()) {
            return "wrongFormat";
        }
        return false;
    };
    
    renderedAddressHandler = () => {
        const badRes = this.checkStringError(this.props.renderedAddress);
        if (!badRes) {
            this.tryGetCoords();
        } else {
            this.props.coordsSearchFailure(this.mapPrompt[badRes]);
        }
    };
    
    tryGetCoords = () => {
        Geocoder.getCoordsFromString(this.props.ymaps, this.props.renderedAddress)
            .then((res) => {
                if (res) {
                    this.props.addressSearchSuccess(res);
                } else {
                    this.props.coordsSearchFailure("Адрес не найден");
                }
            });
    };
    
    tryGetAddress = () => {
        Geocoder.getAddressFromCoords(this.props.ymaps, this.props.uncheckedCoords)
            .then((res) => {
                if (res) {
                    this.props.addressSearchSuccess(res);
                } else {
                    this.props.addressSearchFailure("Пожалуйста, введите адрес", this.props.uncheckedCoords);
                }
            });
    };
    
    render() {
        return true
    }
}


const mapStateToProps = (state) => {
    
    return {
        ymaps: state.ymaps,
        uncheckedCoords: state.uncheckedCoords,
        renderedAddress: state.renderedAddress,
        validCoords: state.validCoords,
        validAddress: state.validAddress,
        isValid: state.isValid,
        awaitingOrderRequest: state.awaitingOrderRequest,
        suitableDriver: state.suitableDriver,
        awaitingCancelRequest: state.awaitingCancelRequest,
        orderId: state.orderId
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    
    const { driversService } = ownProps;
    
    return {
        uncheckedCoordsChanged: (coords) => dispatch(uncheckedCoordsChanged(coords)),
        coordsSearchFailure: (prompt) => dispatch(coordsSearchFailure(prompt)),
        addressSearchSuccess: (coordsObj, instance) => dispatch(addressSearchSuccess(coordsObj, instance)),
        addressSearchFailure: (prompt, coords) => dispatch(addressSearchFailure(prompt, coords)),
        fetchDrivers: (coordsObj) => fetchDrivers(coordsObj, driversService, dispatch)(),
        fetchOrderCreation: (coordsObj, driverId) => fetchOrderCreation(coordsObj, driverId, driversService, dispatch)(),
        fetchOrderCancel: (orderId) => fetchOrderCancel(orderId, driversService, dispatch)()
    }
};


export default compose(
    WithDriversService(),
    connect(mapStateToProps, mapDispatchToProps)
)(CoordsHandler);
