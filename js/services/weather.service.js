'use strict'
export const weatherService = {
    getWeather
}


function getWeather(pos){
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${pos.lat}&lon=${pos.lng}&APPID=90960ba02002a655c8158e13174ad90d&units=metric`)
            .then(weather => {
                console.log(weather.data);
                
                return weather.data
            })

}