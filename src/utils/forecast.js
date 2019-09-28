const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/7d691ce03f62a81becf3850f44a60f0c/${latitude},${longitude}?units=si`;
  request({
    url,
    json: true
  }, (error, { body } ) => {
    if (error) {
      callback('Unable to connect', undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      callback(undefined, {
        temp: body.currently.temperature,
        summary: body.daily.summary,
        precip: body.currently.precipProbability,
        timezone: body.timezone
      });
    }
  })
}

module.exports = forecast;