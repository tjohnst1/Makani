import React from 'react';
import { shallow } from 'enzyme';

import { Weather } from '../../components/Weather';

describe('<Weather />', function() {
  const props = {
    currentWeather: {
      feelsLike: 43.68,
      icon: "partly-cloudy-night",
      summary: "Partly Cloudy",
      temp: 46.44,
      unitOfMeasurement: "fahrenheit",
    },
    loading: false,
    dispatch: jest.fn(),
    flipped: false,
    forecast: [
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
    ],
    location: {
      city: "Portland",
      country: "US",
      lat: 45.5345122,
      lng: -122.6390747,
      state: "Oregon",
      zip: "97232",
    },
  }
  const weather = shallow(<Weather { ...props }/>);

  it('should render without error', function() {
    expect(weather.is('.weather')).toBe(true);
  });

  it('should display a location, icon, weather summary, temperature values based on the props', function() {
    expect(weather.find('.weather__location').props().children).toEqual('Portland');
    expect(weather.find('.icon').exists()).toBe(true);
    expect(weather.find('.weather__summary').props().children).toEqual('Partly Cloudy');
    expect(weather.find('.weather__temp').children().first().props().children).toEqual([46, "°"]);
    expect(weather.find('.weather__feels-like').props().children).toEqual(["Feels like ", 44, "°"]);
    expect(weather.find('.weather__upcoming').children()).toHaveLength(3);
  });

  it('should display 3 upcoming weather values', function() {
    expect(weather.find('.weather__upcoming')
      .children()
      .map(node => node.name() ))
      .toEqual(['UpcomingForecast', 'UpcomingForecast', 'UpcomingForecast']);
  })

});
