import { SET_WEATHER } from '../constants';

const initialState = {
  temp: null,
  feelsLike: null,
  summary: null,
  icon: null,
  unitOfMeasurement: 'fahrenheit',
  loading: true,
}

export default function currentWeather(state = initialState, action) {
  switch (action.type) {
    case SET_WEATHER:
      return Object.assign({}, action.weather.currentWeather, {
        loading: false,
      });
    default:
      return state;
  }
}
