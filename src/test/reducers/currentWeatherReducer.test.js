import currentWeather from '../../reducers/currentWeatherReducer';
import { SET_WEATHER } from '../../constants';

describe('card reducer', function() {
  const initialState = {
    feelsLike: 43.68,
    icon: "partly-cloudy-night",
    summary: "Partly Cloudy",
    temp: 46.44,
    unitOfMeasurement: "fahrenheit",
    loading: true,
  }

  it ('returns the initial state', function() {
    expect(currentWeather(initialState, {type: null})).toEqual(initialState);
  });

  it ('should update the current weather values', function() {
    const action = {
      type: SET_WEATHER,
      weather: {
        currentWeather: {
          feelsLike: 77.68,
          icon: "windy",
          summary: "windy",
          temp: 77.77,
          unitOfMeasurement: "fahrenheit",
        }
      }
    }

    expect(currentWeather(initialState, action)).toEqual({
      feelsLike: 77.68,
      icon: "windy",
      summary: "windy",
      temp: 77.77,
      unitOfMeasurement: "fahrenheit",
      loading: false,
    });
  });

})
