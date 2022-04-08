const request = require('request')
//This is json file created for API ACCESS KEY
const access_keys=require('./accessKeys.json');
const geocode = (address, callback) => {
    const url=`http://api.positionstack.com/v1/forward?access_key=${access_keys.Geocode_Access_key}&query=${address}`
    request({ url, json: true }, (error, { body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (!body.data) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label,
            })
        }
    })
}

module.exports = geocode