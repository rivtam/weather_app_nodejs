const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGFtbWVhIiwiYSI6ImNrMHdwZjJqYjE4NG4zaHBja3hmMDJ6czMifQ.6s41DxIR-i4d-632dTtKpg&limit=1`;

  request({
      url,
      json: true
    }, (error, { body }) => {
      if (error) {
        callback('Unable to connect to location services!', undefined);
      } else if (body.features.length === 0) {
        callback('Unable to find location, try another search.', undefined);
      } else {
        const featureArr = body.features;
        callback(undefined, {
          place: featureArr[0].place_name,
          long: featureArr[0].center[0],
          lat: featureArr[0].center[1]
        });
      }
    }

  )
}

module.exports = geocode;
