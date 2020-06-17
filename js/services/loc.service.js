export const locService = {
    getLocs: getLocs,
    getPosition: getPosition,
    getSearchPosition
}
// export const locService = {
//     getLocs: getLocs,
//     getPosition: getPosition
// }
var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
        
    })
}

function getSearchPosition(inputVal){
    
            return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${inputVal}&key=AIzaSyDzGFs8hXnDHGcN3_zuh73cokdmjhJvXao`)
            .then(pos => {
                return pos.data.results[0].geometry.location
            })
    

}

// var currLocation = {
//     lat: 0,
//     lng: 0
// }

// document.querySelector('.copy-button').addEventListener('click', () => {
//     navigator.clipboard.writeText(`http://api.openweathermap.org/data/2.5/weather?lat=${currLocation.lat}&lon=${currLocation.lng}&APPID=AIzaSyAgtN5KQr1UXxKEKHmWx841CWJor3gFELI`)
// })

