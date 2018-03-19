import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { getWeatherInfo, shouldGetWeatherInfo, shouldUpdateUnitOfMeasurement, updateWeatherInfoIfNeeded } from '../../actions/weatherActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  currentWeather: {
    temp: 52.02,
    feelsLike: 52.02,
    summary: 'Partly Cloudy',
    icon: 'partly-cloudy-day',
  },
  forecast: [
    {
      temp: 46.405,
      icon: 'partly-cloudy-day',
      day: 'Monday',
    },
    {
      temp: 51.365,
      icon: 'partly-cloudy-night',
      day: 'Tuesday',
    },
    {
      temp: 48.55,
      icon: 'cloudy',
      day: 'Wednesday',
    }
  ],
  location: {
    city: "Portland",
    country: "US",
    lat: 45.5345122,
    lng: -122.6390747,
    state: "Oregon",
    zip: "97232",
  },
});

fetchMock.post(
  `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_KEY}`,
  {
    body: {
     location: {
      lat: 45.5345122,
      lng: -122.6390747
     },
     accuracy: 1976.0
    },
    headers: {
      'content-type': 'application/json'
    }
  }
);

fetchMock.get(
  '/api/city/45.5345122/-122.6390747',
  {
    body: {
      zip: '97232',
      city: 'Portland',
      state: 'Oregon',
      country: 'US'
    },
    headers: {
      'content-type': 'application/json'
    }
  }
);

fetchMock.get(
  '/api/city/11205',
  {
    body: {
      city: 'Brooklyn',
      country: 'US',
      lat: 40.6945036,
      lng: -73.9565551,
      state: 'New York',
      zip: '11205',
    },
    headers: {
      'content-type': 'application/json'
    }
  }
);

fetchMock.get(
  '/api/weather/45.5345122/-122.6390747',
  {
    body: {
      currentWeather: {
        temp: 52.02,
        feelsLike: 52.02,
        summary: 'Partly Cloudy',
        icon: 'partly-cloudy-day',
      },
      forecast: [
        {
          temp: 46.405,
          icon: 'partly-cloudy-day',
          day: 'Monday',
        },
        {
          temp: 51.365,
          icon: 'partly-cloudy-night',
          day: 'Tuesday',
        },
        {
          temp: 48.55,
          icon: 'cloudy',
          day: 'Wednesday',
        }
      ]
    },
    headers: {
      'content-type': 'application/json'
    }
  }
);

fetchMock.get(
  '/api/weather/40.6945036/-73.9565551',
  {
    body: {
      currentWeather: {
        temp: 32.62,
        feelsLike: 36.92,
        summary: 'Clear',
        icon: 'clear-night',
      },
      forecast: [
        {
          temp: 34.18,
          icon: 'snow',
          day: 'Monday',
        },
        {
          temp: 38.65,
          icon: 'partly-cloudy-day',
          day: 'Tuesday',
        },
        {
          temp: 40.4,
          icon: 'partly-cloudy-day',
          day: 'Wednesday',
        }
      ]
    },
    headers: {
      'content-type': 'application/json'
    }
  }
);

const expectedActions = [
  {
    type: 'SET_WEATHER',
    weather: {
      currentWeather: {
        feelsLike: 52.02,
        icon: 'partly-cloudy-day',
        summary: 'Partly Cloudy',
        temp: 52.02,
        unitOfMeasurement: 'fahrenheit',
      },
      forecast: [
        {
          day: 'Monday',
          icon: 'partly-cloudy-day',
          temp: 46.405,
        },
        {
          day: 'Tuesday',
          icon: 'partly-cloudy-night',
          temp: 51.365,
        },
        {
          day: 'Wednesday',
          icon: 'cloudy',
          temp: 48.55,
        },
      ],
      location: {
        city: 'Portland',
        country: 'US',
        lat: 45.5345122,
        lng: -122.6390747,
        state: 'Oregon',
        zip: '97232',
      },
    },
  },
  {
    type: 'SET_WEATHER',
    weather: {
      currentWeather: {
        temp: 32.62,
        feelsLike: 36.92,
        summary: 'Clear',
        icon: 'clear-night',
        unitOfMeasurement: 'fahrenheit',
      },
      forecast: [
        {
          temp: 34.18,
          icon: 'snow',
          day: 'Monday',
        },
        {
          temp: 38.65,
          icon: 'partly-cloudy-day',
          day: 'Tuesday',
        },
        {
          temp: 40.4,
          icon: 'partly-cloudy-day',
          day: 'Wednesday',
        }
      ],
      location: {
        city: 'Brooklyn',
        country: 'US',
        lat: 40.6945036,
        lng: -73.9565551,
        state: 'New York',
        zip: '11205',
      },
    },
  }
];

describe('getWeatherInfo', function() {
  it ('should return weather info for the current location', function() {
    return store.dispatch(getWeatherInfo())
    .then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0])
    });
  })
});

describe('shouldGetWeatherInfo', function() {
  it ('should determine if additional weather info is needed', function() {
    const location = {
      city: 'Portland',
      country: 'US',
      lat: 45.5345122,
      lng: -122.6390747,
      state: 'Oregon',
      zip: '97232',
    }
    expect(shouldGetWeatherInfo('Portland', location)).toEqual(false);
    expect(shouldGetWeatherInfo('97232', location)).toEqual(false);
    expect(shouldGetWeatherInfo('New York', location)).toEqual(true);
    expect(shouldGetWeatherInfo('11205', location)).toEqual(true);
  })
});

describe('updateWeatherInfoIfNeeded', function() {
  it ('should determine if the unit of measurement needs to be changed', function() {
    const newValues = {
      query: '11205',
      weather: {
        unitOfMeasurement: 'fahrenheit',
      }
    }
    store.dispatch(updateWeatherInfoIfNeeded(newValues))
      .then(() => expect(store.getActions()[1]).toEqual(expectedActions[1]));
  })
});

describe('shouldUpdateUnitOfMeasurement', function() {
  it ('should determine if the unit of measurement needs to be changed', function() {
    expect(shouldUpdateUnitOfMeasurement('fahrenheit', 'celsius')).toEqual(true);
    expect(shouldUpdateUnitOfMeasurement('fahrenheit', 'fahrenheit')).toEqual(false);
  })
});
