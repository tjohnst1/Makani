import fetchMock from 'fetch-mock'
const request = require('supertest');
const app = require('../../server');

describe('/api/city/:location', function() {
  const brooklyn = {
    zip: '11205',
    city: 'Brooklyn',
    state: 'New York',
    country: 'US',
    lat: 40.6945036,
    lng: -73.9565551,
  }

  const portland = {
    city: 'Portland',
    country: 'US',
    lat: 45.5230622,
    lng: -122.6764815,
    state: 'Oregon',
  }

  it('should return city info with a zipcode', function() {
    return request(app)
      .get('/api/city/11205')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(response.body).toEqual(brooklyn)
      });
  })

  it('should return city info with a location', function() {
    return request(app)
      .get('/api/city/portland,or')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(response.body).toEqual(portland)
      });
  })
});

describe('/api/city/:lat/:lng', function() {
  const portland = {
    city: 'Portland',
    country: 'US',
    state: 'Oregon',
    zip: '97232',
  }
  it('should return city info with coords', function() {
    return request(app)
      .get('/api/city/45.5345122/-122.6390747')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(response.body).toEqual(portland)
      });
  })
});

describe('/api/weather/:lat/:lng', function() {

  fetchMock.get(
    `/api/weather/45.5345122/-122.6390747`,
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

  it('should return weather info with coords', function() {
    return request(app)
      .get('/api/weather/45.5345122/-122.6390747')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
      });
  })
});
