require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));

function getCityInfo(lat, lng) {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
    .then(response => response.json())
    .then(json => {
      const location = {}

      // check that something was indeed found
      if (json.status === 'OK') {
        json.results.forEach(result => {
          // find the postal code address component and set values based off of what is found
          if (result.types[0] === 'postal_code') {
            result.address_components.forEach(addressComponent => {
              switch (addressComponent.types[0]) {
                case 'postal_code':
                  return location.zip = addressComponent.long_name;
                case 'locality':
                  return location.city = addressComponent.long_name;
                case 'administrative_area_level_1':
                  return location.state = addressComponent.long_name;
                case 'country':
                  return location.country = addressComponent.short_name;
                default:
                  return;
              }
            })
          }
        })
      }

      return location;
    })
}

function getWeatherInfo(lat, lng) {
  return fetch(`https://api.darksky.net/forecast/${process.env.REACT_APP_DS_KEY}/${lat},${lng}`)
    .then(response => response.json())
    .then(json => ({
      temp: {
        current: json.currently.temperature,
        feelsLike: json.currently.apparentTemperature,
        summary: json.currently.summary,
        icon: json.currently.icon,
      },
      upcoming: [
        {
          temp: (json.daily.data[1].temperatureHigh + json.daily.data[1].temperatureLow) / 2,
          icon: json.daily.data[1].icon,
        },
        {
          temp: (json.daily.data[2].temperatureHigh + json.daily.data[2].temperatureLow) / 2,
          icon: json.daily.data[2].icon,
        },
        {
          temp: (json.daily.data[3].temperatureHigh + json.daily.data[3].temperatureLow) / 2,
          icon: json.daily.data[3].icon,
        },
      ],
    }));
}

app.get('/api/city/:lat/:lng', function (req, res) {
  const { lat, lng } = req.params
  getCityInfo(lat, lng)
    .then(cityInfo => res.json(cityInfo))
});

app.get('/api/weather/:lat/:lng', function (req, res) {
  const { lat, lng } = req.params
  getWeatherInfo(lat, lng)
    .then(weatherInfo => res.json(weatherInfo))
});

app.listen(process.env.PORT || 8080);
