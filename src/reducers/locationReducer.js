import { SET_WEATHER } from '../constants';

const initialState = {
  lat: null,
  lng: null,
  zip: null,
  city: null,
  state: null,
  country: null,
}

export default function location(state = initialState, action) {
  switch (action.type) {
    case SET_WEATHER:
      return action.weather.location;
    default:
      return state;
  }
}
