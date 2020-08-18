
const reducer = (state, action) => {
    // console.log(action);
    
    if (state === undefined) {
        return {
            ...state,
            
            mapCenter: [56.850826829480965,53.20532442065424],
            ymaps: null,
            loadingMap: true,
    
            uncheckedCoords: null,
            renderedCoords: null,
            renderedAddress: '',
            isValid: false,
            validAddress: null,
            validCoords: null,
            prompt: 'Пожалуйста, введите адрес',
            
            driversLoading: false,
            drivers: null,
            suitableDriver: null,
            
            awaitingOrderRequest: false,
            orderLoading: false,
            orderCreated: false,
            orderId: null,
            
            awaitingCancelRequest: false,
            cancelLoading: false
        };
    }

    switch (action.type) {

        case "FETCH_YMAPS_SUCCESS":
            return {
                ...state,
                ymaps: action.payload,
                loadingMap: false
            };

            
        case "UNCHECKED_COORDS_HAS_CHANGED":
            return {
                ...state,
                uncheckedCoords: action.payload,
                isValid: false,
                awaitingOrderRequest: false,
            };

        case "RENDERED_ADDRESS_HAS_CHANGED":
            return {
                ...state,
                renderedAddress: action.payload,
                uncheckedCoords: null,
                validAddress: null,
                validCoords: null,
                isValid: false,
                awaitingOrderRequest: false
            };
            

        case "COORDS_SEARCH_FAILURE":
            return {
                ...state,
                validAddress: null,
                validCoords: null,
                uncheckedCoords: null,
                renderedCoords: null,
                isValid: false,
                prompt: action.payload,
                drivers: null,
                suitableDriver: null,
                awaitingOrderRequest: false
            };
            
        case "ADDRESS_SEARCH_FAILURE":
            return {
                ...state,
                validAddress: null,
                validCoords: null,
                renderedAddress: '',
                renderedCoords: action.payload.coords,
                isValid: false,
                prompt: action.payload['prompt'],
                drivers: null,
                suitableDriver: null,
                awaitingOrderRequest: false
            };
            

        case "COORDS_SEARCH_SUCCESS":
            return {
                ...state,
                validAddress: action.payload['address'],
                validCoords: action.payload['coords'],
                renderedAddress: action.payload['address'],
                renderedCoords: action.payload['coords'],
                isValid: true,
                prompt: ''
            };
            

        case "FETCH_DRIVERS_REQUEST":
            return {
                ...state,
                driversLoading: true
            };
        case "FETCH_DRIVERS_SUCCESS":
            return {
                ...state,
                drivers: action.payload,
                driversLoading: false
            };

        case "SUITABLE_DRIVER_SET":
            return {
                ...state,
                suitableDriver: action.payload
            };

        case "AWAITING_ORDER_SET":
            return {
                ...state,
                awaitingOrderRequest: true
            };
            

        case "ORDER_CREATION_REQUEST":
            return {
                ...state,
                orderLoading: true
            };
        case "ORDER_CREATION_SUCCESS":
            return {
                ...state,
                orderLoading: false,
                orderCreated: true,
                awaitingOrderRequest: false,
                orderId: action.payload
            };
    
    
    
    
        case "AWAITING_CANCEL_SET":
            return {
                ...state,
                awaitingCancelRequest: true
            };
            
        case "CANCEL_ORDER_REQUEST":
            return {
                ...state,
                cancelLoading: true
            };
    
        case "CANCEL_ORDER_SUCCESS":
            return {
                ...state,
                orderLoading: false,
                orderCreated: false,
                awaitingOrderRequest: false,
                awaitingCancelRequest: false,
                cancelLoading: false
            };
        
        

        default:
            return {
                ...state
            }
    }
};


export default reducer;
