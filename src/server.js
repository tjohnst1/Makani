require('dotenv').config()

const express = require('express');
// const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));

function getCityInfoFromCoords(lat, lng) {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
    .then(response => response.json())
    .then(json => {
      const cityInfo = {};

      // check that something was indeed found
      if (json.status === 'OK') {
        json.results.forEach(result => {
          // find the postal code address component and set values based off of what is found
          if (result.types[0] === 'postal_code') {
            result.address_components.forEach(addressComponent => {
              switch (addressComponent.types[0]) {
                case 'postal_code':
                  return cityInfo.zip = addressComponent.long_name;
                case 'locality':
                  return cityInfo.city = addressComponent.long_name;
                case 'administrative_area_level_1':
                  return cityInfo.state = addressComponent.long_name;
                case 'country':
                  return cityInfo.country = addressComponent.short_name;
                default:
                  return;
              }
            })
          }
        })
      }

      console.log(cityInfo)
      return cityInfo;
    })
}

function getDayFromUnix(time) {
  const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(time * 1000);
  return dayArr[date.getDay()];
}

function getWeatherInfo(lat, lng) {
  return fetch(`https://api.darksky.net/forecast/${process.env.REACT_APP_DS_KEY}/${lat},${lng}`)
    .then(response => response.json())
    .then(json => {
      return ({
        currentWeather: {
          temp: json.currently.temperature,
          feelsLike: json.currently.apparentTemperature,
          summary: json.currently.summary,
          icon: json.currently.icon,
        },
        forecast: [
          {
            temp: (json.daily.data[1].temperatureHigh + json.daily.data[1].temperatureLow) / 2,
            icon: json.daily.data[1].icon,
            day: getDayFromUnix(json.daily.data[1].time),
          },
          {
            temp: (json.daily.data[2].temperatureHigh + json.daily.data[2].temperatureLow) / 2,
            icon: json.daily.data[2].icon,
            day: getDayFromUnix(json.daily.data[2].time),
          },
          {
            temp: (json.daily.data[3].temperatureHigh + json.daily.data[3].temperatureLow) / 2,
            icon: json.daily.data[3].icon,
            day: getDayFromUnix(json.daily.data[3].time),
          },
        ],
      })
    });
}

function getCityInfoFromLocation(location) {
  const trimmedLocation = location.replace(' ', '');

  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${trimmedLocation}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
    .then(response => response.json())
    .then(json => {
      const cityInfo = {};

      // check that something was indeed found
      if (json.status === 'OK') {
        const result = json.results[0];
        result.address_components.forEach(addressComponent => {
          switch (addressComponent.types[0]) {
            case 'postal_code':
              return cityInfo.zip = addressComponent.long_name;
            case 'locality':
            case 'political':
              return cityInfo.city = addressComponent.long_name;
            case 'administrative_area_level_1':
              return cityInfo.state = addressComponent.long_name;
            case 'country':
              return cityInfo.country = addressComponent.short_name;
            default:
              return;
          }
        })

        cityInfo.lat = result.geometry.location.lat;
        cityInfo.lng = result.geometry.location.lng;
      }

      return cityInfo;
    })
}

app.get('/api/city/:location', function (req, res) {
  const { location } = req.params;
  getCityInfoFromLocation(location)
    .then(cityInfo => res.json(cityInfo))
    .catch(() => res.status(500));
});

app.get('/api/city/:lat/:lng', function (req, res) {
  const { lat, lng } = req.params;
  getCityInfoFromCoords(lat, lng)
    .then(cityInfo => res.json(cityInfo))
    .catch(() => res.status(500));
});

app.get('/api/weather/:lat/:lng', function (req, res) {
  const { lat, lng } = req.params;
  getWeatherInfo(lat, lng)
    .then(weatherInfo => res.json(weatherInfo))
    .catch(() => res.status(500));
});

app.listen(process.env.PORT || 8080);
