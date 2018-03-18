import error from '../../reducers/errorReducer';
import { DISPLAY_ERROR } from '../../constants';

describe('error reducer', function() {
  const initialState = {
    error: {
      showError: false,
      msg: 'Unfortunately, there has been an error fetching your data. Please try again later.',
    },
  }

  it ('returns the initial state', function() {
    expect(error(initialState, {type: null})).toEqual(initialState);
  });

  it ('should update the error values', function() {
    const newError = {
      showError: true,
      msg: 'There is an error. Panic.',
    }

    const action = {
      type: DISPLAY_ERROR,
      error: newError
    }

    expect(error(initialState, action)).toEqual(newError);
  });
})
