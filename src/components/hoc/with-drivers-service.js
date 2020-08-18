import React from "react";

import { DriversServiceConsumer } from "../drivers-service-context";



const WithDriversService = () => (Wrapped) => {
    
    return (props) => {
        return (
            <DriversServiceConsumer>
                {
                    (driversService) => {
                        return (
                            <Wrapped {...props}
                                     driversService={driversService}
                            />
                        )
                    }
                }
            </DriversServiceConsumer>
        )
    }
};

export default WithDriversService;
