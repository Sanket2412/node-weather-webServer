const request = require('request')
//This is json file created for API ACCESS KEY
const access_keys=require('./accessKeys.json');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${access_keys.Forecast_Access_Key}&query= ${latitude},${longitude}`

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
        }
    })
}

module.exports = forecast