import { DISPLAY_ERROR } from '../constants';

const initialState = {
  error: {
    showError: false,
    msg: 'Unfortunately, there has been an error fetching your data. Please try again later.',
  },
}

export default function error(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_ERROR:
      return action.error;
    default:
      return state;
  }
}
