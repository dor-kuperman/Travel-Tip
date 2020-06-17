console.log('Main!');

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'


locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    mapService.initMap()
        .then(() => {
            console.log('init success');

            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch((err) => console.log(err, 'INIT MAP ERROR'));

    locService.getPosition()
        .then(pos => {

            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}


document.querySelector('.my-location-btn').addEventListener('click', () => {

    locService.getPosition()
        .then(pos => {
            mapService.panTo(pos.coords.latitude, pos.coords.longitude);
        })
})

document.querySelector('.search-btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    let inputVal = document.querySelector('input').value;
    console.log('inputVal', inputVal);

    locService.getSearchPosition(inputVal)
        .then(pos => {
            mapService.panTo(pos.lat, pos.lng);
            mapService.addMarker(pos)
            document.querySelector('.copy-button').addEventListener('click', () => {
                navigator.clipboard.writeText(`http://api.openweathermap.org/data/2.5/weather?lat=${pos.lat}&lon=${pos.lng}&APPID=AIzaSyAgtN5KQr1UXxKEKHmWx841CWJor3gFELI`)
            })
            weatherService.getWeather(pos)
            .then(weather=>{
                console.log(weather);
                document.querySelector('h2').innerText =`Location: `;
                document.querySelector('.second-block p').innerText =`${weather.name}, ${weather.sys.country}`;
                document.querySelector('.third-block h3').innerText =`Weather Today`;
                document.querySelector('p.location').innerText = `${weather.name}, ${weather.sys.country} ICON HERE ${weather.weather[0].description}`;
                document.querySelector('p.temp').innerText = `${weather.main.temp}C° temperature from ${weather.main.temp_min}C° to ${weather.main.temp_max}C°, wind ${weather.wind.speed}m/s.`;
                document.querySelector('.weather-icon').src=`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
                
            })
        })
})

