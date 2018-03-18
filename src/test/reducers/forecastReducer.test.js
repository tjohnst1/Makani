import forecast from '../../reducers/forecastReducer';
import { SET_WEATHER } from '../../constants';

describe('forecast reducer', function() {
  const initialState = [];

  it ('returns the initial state', function() {
    expect(forecast(initialState, { type: null })).toEqual(initialState);
  });

  it ('should update the forecast values', function() {
    const newForecast = [
      {
        day: "Sunday",
        icon: "partly-cloudy-day",
        temp: 45.894999999999996,
      },
      {
        day: "Monday",
        icon: "partly-cloudy-day",
        temp: 46.195,
      },
      {
        day: "Tuesday",
        icon: "partly-cloudy-day",
        temp: 52.39,
      },
    ];

    const action = {
      type: SET_WEATHER,
      weather: {
        forecast: newForecast,
      },
    }

    expect(forecast(initialState, action)).toEqual(newForecast);
  });
})
