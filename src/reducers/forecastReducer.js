import { SET_WEATHER } from '../constants';

const initialState = [];

export default function forecast(state = initialState, action) {
  switch (action.type) {
    case SET_WEATHER:
      return action.weather.forecast;
    default:
      return state;
  }
}
