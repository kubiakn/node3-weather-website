const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoibmt1YmlhayIsImEiOiJja2ZwMDloZzAwNm13MnlydjhkMTJwdXVvIn0.8mglwbkOinxfuAEN38lHuA&limit=1'

    request({ url: url, json: true}, (error, {body}) => {
        const { features } = body
        const { length } = features

        if(features.length > 0) {
            const { center, place_name } = features[0]

            if(error) {
                callback('Unable to connect to location services!', undefined)
            } else if(length === 0) {
                callback('Unable to find location. Try another search.')
            } else {
                callback(undefined, {
                    latitude: center[1],
                    longitude: center[0],
                    location: place_name
                })
            }
        } else {
            callback('Unable to find location. Try another search.')
        }
        
    })
}

module.exports = geocode