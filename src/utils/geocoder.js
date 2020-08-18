
class Geocoder {
    
    static getCoordsFromString = (ymaps, addressString) => {
        
        return new Promise((resolve) => {
            const buildingNumber = parseInt(addressString.split(',')[1]);
    
            ymaps.geocode(`Ижевск, ${addressString}`, {results: 1})
                .then((res) => {
                    const firstGeoObject = res.geoObjects.get(0);
                    const foundBuildingNumber = parseInt(firstGeoObject.getPremiseNumber());
            
                    if (foundBuildingNumber === buildingNumber) {
                        const coords = firstGeoObject.geometry.getCoordinates();
                        const res = {
                            coords : coords,
                            address: addressString
                        };
                        resolve(res);
                    } else {
                        resolve(false);
                    }
                })
                .catch((e) => console.log(e))
        });
    };
    
    
    static getAddressFromCoords = (ymaps, coords) => {
    
        return new Promise((resolve) => {
            ymaps.geocode(coords)
                .then((res) => {
                    const firstGeoObject = res.geoObjects.get(0);
                    const foundBuildingNumber = firstGeoObject.getPremiseNumber();
                    const street = firstGeoObject.getThoroughfare();
            
                    const address = `${street}, ${foundBuildingNumber}`;
            
                    if (foundBuildingNumber) {
                        const res = {
                            coords : coords,
                            address: address
                        };
                        resolve(res);
                    } else {
                        resolve(false);
                    }
                });
        });
    }
}


export default Geocoder;
