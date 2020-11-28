const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2c6af20744b8b2fc5f0854fa9a8b7a8c&query=' + latitude + ',' + longitude + '&units=f'
    console.log(url)

    request({ url, json: true }, (error, { body }) => {
        const { current, error: apiError } = body
        const { weather_descriptions, temperature, feelslike, humidity } = current

        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(apiError) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, weather_descriptions[0] + '. It is currently ' + temperature + ' degrees out. If feels like '+ feelslike + ' degrees out. The humidity is '+humidity+'%.')
        }
    })
}

module.exports = forecast