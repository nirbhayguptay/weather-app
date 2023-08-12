const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  api_key = "17fad380bfc0530cf1122500553bf570";
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${latitude},${longitude}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        " It is currently " +
          response.body.current.temperature +
          " degress out. There is a " +
          response.body.current.feelslike +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
