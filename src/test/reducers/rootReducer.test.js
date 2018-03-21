import { createStore } from 'redux'
import rootReducer from '../../reducers/rootReducer';

describe('root reducer', function() {
  const store = createStore(rootReducer);
  const initialState = {
    card: {
      flipped: false
    },
    currentWeather: {
      feelsLike: null,
      icon: null,
      loading: true,
      summary: null,
      temp: null,
      unitOfMeasurement: 'fahrenheit'
    },
    error: {
      error: {
        msg: 'Unfortunately, there has been an error fetching your data. Please try again later.',
        'showError': false,
      }
    },
    forecast: [],
    location: {
      city: null,
      country: null,
      lat: null,
      lng: null,
      state: null,
      zip: null
    },
  }

  it('should return the initial state', function() {
    expect(store.getState()).toEqual(initialState);
  })
});
