
const ymapsLoaded = (ymaps) => {
    return {
        type: "FETCH_YMAPS_SUCCESS",
        payload: ymaps
    }
};


const uncheckedCoordsChanged = (coords) => {
    return {
        type: "UNCHECKED_COORDS_HAS_CHANGED",
        payload: coords
    }
};
const renderedAddressChanged = (address) => {
    return {
        type: "RENDERED_ADDRESS_HAS_CHANGED",
        payload: address
    }
};


const coordsSearchFailure = (prompt) => {
    return {
        type: "COORDS_SEARCH_FAILURE",
        payload: prompt
    }
};
const addressSearchFailure = (prompt, coords) => {
    const obj = { prompt, coords };
    return {
        type: "ADDRESS_SEARCH_FAILURE",
        payload: obj
    }
};

const addressSearchSuccess = (coordsObj) => {
    return {
        type: "COORDS_SEARCH_SUCCESS",
        payload: coordsObj
    }
};



const driversRequest = () => {
    return {
        type: "FETCH_DRIVERS_REQUEST"
    }
};
const driversLoaded = (drivers) => {
    return {
        type: "FETCH_DRIVERS_SUCCESS",
        payload: drivers
    }
};
const suitableDriversSet = (driver) => {
    return {
        type: "SUITABLE_DRIVER_SET",
        payload: driver
    }
};
const fetchDrivers = (coordsObj, driverService, dispatch) => () => {
    dispatch(driversRequest());
    driverService.getDrivers(coordsObj)
        .then((res) => {
            if (res.descr === "OK") {
                const drivers = res.data.crews_info;
                const updatedDriver = drivers.slice(0, 4);
                updatedDriver.sort((a, b) => a.distance > b.distance ? 1 : -1);
                dispatch(driversLoaded(updatedDriver));
                dispatch(suitableDriversSet(updatedDriver[0]));
            }
        })
        .catch((error) => console.log(error));
};


const awaitingOrderSetter = () => {
    return {
        type: "AWAITING_ORDER_SET"
    }
};


const orderCreationRequest = () => {
    return {
        type: "ORDER_CREATION_REQUEST"
    }
};
const orderCreationSuccess = (orderId) => {
    return {
        type: "ORDER_CREATION_SUCCESS",
        payload: orderId
    }
};
const fetchOrderCreation = (coordsObj, driverId, driverService, dispatch) => () => {
    dispatch(orderCreationRequest());
    driverService.createOrder(coordsObj, driverId)
        .then((res) => {
            if (res.descr === "OK") {
                dispatch(orderCreationSuccess(res.data.order_id));
            }
        })
        .catch((error) => console.log(error));
};


const awaitingCancelSetter = () => {
    return {
        type: "AWAITING_CANCEL_SET"
    }
};

const orderCancelRequest = () => {
    return {
        type: "CANCEL_ORDER_REQUEST"
    }
};

const orderCancelSuccess = () => {
    return {
        type: "CANCEL_ORDER_SUCCESS"
    }
};
const fetchOrderCancel = (orderId, driverService, dispatch) => () => {
    dispatch(orderCancelRequest());
    driverService.cancelOrder(orderId)
        .then((res) => {
            if (res.descr === "OK") {
                dispatch(orderCancelSuccess());
            }
        })
        .catch((error) => console.log(error));
};



export {
    ymapsLoaded,
    uncheckedCoordsChanged,
    renderedAddressChanged,
    addressSearchSuccess,
    coordsSearchFailure,
    addressSearchFailure,
    fetchDrivers,
    awaitingOrderSetter,
    fetchOrderCreation,
    awaitingCancelSetter,
    fetchOrderCancel
}
