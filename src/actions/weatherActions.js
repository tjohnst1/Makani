import { SET_WEATHER } from '../constants';
import { fahrenheitToCelsius, celsiusToFahrenheit } from '../helpers/helpers';

export function getWeatherInfo(location = null, unitOfMeasurement = 'fahrenheit') {
  return dispatch =>
    getLocationInfo(location)
      .then(locationInfo => fetchWeatherInfo(locationInfo, unitOfMeasurement))
      .then(weatherInfo => dispatch(setWeather(weatherInfo)))
}

function getLocationInfo(location = null) {
  // if no zip or city input is provided, geolocate the user and define the location, and fetch the weather data
  if (!location) {
    return geoLocateUser()
      .then(coords => fetchLocationInfoFromCoords(coords))
  }
  // define the location and fetch the weather info
  return fetchLocationInfoFromQuery(location)
}

function geoLocateUser() {
  return fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_KEY}`, { method: 'POST' })
    .then(response => response.json())
    .then(json => ({
      lat: json.location.lat,
      lng: json.location.lng,
    }));
}

function fetchLocationInfoFromCoords(coords) {
  const { lat, lng } = coords;
  return fetch(`/api/city/${lat}/${lng}`)
    .then(res => res.json())
    .then(json => {
      return {
        lat: lat,
        lng: lng,
        zip: json.zip,
        city: json.city,
        state: json.state,
        country: json.country,
      }
    });
}

function fetchLocationInfoFromQuery(location) {
  return fetch(`/api/city/${location}`)
    .then(res => res.json())
    .then(json => {
      return {
        lat: json.lat,
        lng: json.lng,
        zip: json.zip,
        city: json.city,
        state: json.state,
        country: json.country,
      }
    });
}

function fetchWeatherInfo(locationInfo, unitOfMeasurement) {
  const { lat, lng } = locationInfo;
  return fetch(`/api/weather/${lat}/${lng}`)
    .then(res => res.json())
    .then(json => {
      if (unitOfMeasurement === 'celsius') {
        return {
          location: locationInfo,
          currentWeather: Object.assign({}, json.currentWeather, {
            unitOfMeasurement,
            temp: fahrenheitToCelsius(json.currentWeather.temp, unitOfMeasurement),
            feelsLike: fahrenheitToCelsius(json.currentWeather.feelsLike, unitOfMeasurement),
          }),
          forecast: json.forecast.map(weather => {
            return {
              ...weather,
              temp: fahrenheitToCelsius(weather.temp),
            }
          }),
        }
      }
      return {
        location: locationInfo,
        currentWeather: Object.assign({}, json.currentWeather, {
          unitOfMeasurement,
        }),
        forecast: json.forecast,
      }
    });
}

function setWeather(weatherInfo) {
  return {
    type: SET_WEATHER,
    weather: weatherInfo,
  }
}

function shouldGetWeatherInfo(query, currentLocation) {
  switch (query) {
    case currentLocation.city:
    case currentLocation.zip:
      return false;
    default:
      return true;
  }
}

export function updateWeatherInfoIfNeeded(options) {
  return (dispatch, getState) => {
    const state = getState();

    if (shouldGetWeatherInfo(options.query, state.location) || shouldUpdateUnitOfMeasurement(state.currentWeather.unitOfMeasurement, options.weather.unitOfMeasurement)) {
      return dispatch(getWeatherInfo(options.query, options.weather.unitOfMeasurement));
    }

  }
}

function shouldUpdateUnitOfMeasurement(newValue, currentUnit) {
  return newValue !== currentUnit;
}
