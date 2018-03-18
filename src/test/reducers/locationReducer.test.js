import location from '../../reducers/locationReducer';
import { SET_WEATHER } from '../../constants';

describe('location reducer', function() {
  const initialState = {
    lat: null,
    lng: null,
    zip: null,
    city: null,
    state: null,
    country: null,
  }

  it ('returns the initial state', function() {
    expect(location(initialState, { type: null })).toEqual(initialState);
  });

  it ('should update the location values', function() {
    const newLocation = {
      city: "Portland",
      country: "US",
      lat: 45.5345122,
      lng: -122.6390747,
      state: "Oregon",
      zip: "97232",
    }

    const action = {
      type: SET_WEATHER,
      weather: {
        location: newLocation,
      },
    }

    expect(location(initialState, action)).toEqual(newLocation);
  });
})
