import card from '../../reducers/cardReducer';
import { TOGGLE_CARD, SET_WEATHER } from '../../constants';

describe('card reducer', function() {
  const initialState = {
    flipped: false,
  }

  it ('returns the initial state', function() {
    expect(card(initialState, {type: null})).toEqual(initialState);
  });

  it ('should toggle the flipped value', function() {
    expect(card(initialState, {type: TOGGLE_CARD})).toEqual({
      flipped: true,
    });
  });

  it ('should toggle the flipped value if the weather is reset', function() {
    expect(card(initialState, {type: SET_WEATHER})).toEqual({
      flipped: false,
    });
    expect(card({flipped: true}, {type: SET_WEATHER})).toEqual({
      flipped: false,
    });
  });

})
