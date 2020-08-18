
import _drivers from "./drivers-src/drivers";



export default class DriversService {
    
    returnPromiseWithData = (data, timeout) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 1) {
                    reject(new Error("Похоже, что-то пошло не так :("));
                } else {
                    console.log('ответ сервера:');
                    console.log(data);
                    resolve(data)
                }
            }, timeout)
        })
    };
    
    getDateInString = () => {
        const now = new Date();
        const hour = new Date().getHours();
    
        now.setHours(hour + 4);
        const dateInISO = now.toISOString();
        let dateInString = '';
    
        for (let i = 0; i < dateInISO.length - 4; i++) {
            if (Number.isFinite(parseInt(dateInISO[i]))) {
                dateInString += dateInISO[i];
            }
        }
        return dateInString;
    };
    
    
    getDrivers = (coordsObj) => {
        const { coords, address } = coordsObj;
        const lat = coords[0];
        const lon = coords[1];

        const request = {
            "source_time": this.getDateInString(),
            "addresses":[
                {
                    "address":address,
                    "lat": lat,
                    "lon": lon
                }
            ]
        };
        
        const answer = {
            "code": 0,
            // описание
            "descr": "OK",
            "data": {
                "crews_info": _drivers
            }
        };
    
        console.log("Отправляем на сервер запрос водителей:");
        console.log(request);
        
        return this.returnPromiseWithData(answer, 300)
    };
    
    
    createOrder = (coordsObj, driverId) => {
        const { coords, address } = coordsObj;
        const lat = coords[0];
        const lon = coords[1];
    
        const request = {
            "source_time": this.getDateInString(),
            "addresses":[
                {
                    "address":address,
                    "lat": lat,
                    "lon": lon
                }
            ],
            "crew_id": driverId
        };
    
        const answer = {
            "code":0,
            "descr":"OK",
            "data":{
                "order_id":12345
            }
        };
    
        console.log("Отправляем на сервер запрос создания заказа:");
        console.log(request);
    
        return this.returnPromiseWithData(answer, 2000)
    };
    
    
    cancelOrder = (orderId) => {
    
        const request = {
            "source_time": this.getDateInString(),
            "order_id": orderId
        };
    
        const answer = {
            "code":0,
            "descr":"OK"
        };
    
        console.log("Отправляем на сервер запрос отмены заказа:");
        console.log(request);
    
        return this.returnPromiseWithData(answer, 2000)
    }
}
