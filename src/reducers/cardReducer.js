import { TOGGLE_CARD, SET_WEATHER } from '../constants';

const initialState = {
  flipped: false,
}

export default function card(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_CARD:
      return { flipped: !state.flipped };
    case SET_WEATHER:
      if (state.flipped) {
        return { flipped: false };
      }
      return state;
    default:
      return state;
  }
}
