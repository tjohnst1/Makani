import React from 'react';
import { generateIcon, fahrenheitToCelsius } from '../../helpers/helpers';
import CloudyIcon from '....//img/cloudy.svg';
import DayCloudyIcon from '../../img/day-cloudy.svg';
import DaySunnyIcon from '../../img/day-sunny.svg';
import FogIcon from '../../img/fog.svg';
import HailIcon from '../../img/hail.svg';
import NightAltCloudyIcon from '../../img/night-alt-cloudy.svg';
import NightClearIcon from '../../img/night-clear.svg';
import RainIcon from '../../img/rain.svg';
import SleetIcon from '../../img/sleet.svg';
import SnowIcon from '../../img/snow.svg';
import ThunderstormIcon from '../../img/thunderstorm.svg';
import TornadoIcon from '../../img/tornado.svg';
import WindyIcon from '../../img/windy.svg';

describe('generateIcon', function() {
  it ('should display a icon based on text input', function() {
    expect(generateIcon('clear-day')).toEqual(<DaySunnyIcon className="icon" />);
    expect(generateIcon('clear-night')).toEqual(<NightClearIcon className="icon" />);
    expect(generateIcon('rain')).toEqual(<RainIcon className="icon" />);
    expect(generateIcon('snow')).toEqual(<SnowIcon className="icon" />);
    expect(generateIcon('sleet')).toEqual(<SleetIcon className="icon" />);
    expect(generateIcon('wind')).toEqual(<WindyIcon className="icon" />);
    expect(generateIcon('fog')).toEqual(<FogIcon className="icon" />);
    expect(generateIcon('cloudy')).toEqual(<CloudyIcon className="icon" />);
    expect(generateIcon('partly-cloudy-day')).toEqual(<DayCloudyIcon className="icon" />);
    expect(generateIcon('partly-cloudy-night')).toEqual(<NightAltCloudyIcon className="icon" />);
    expect(generateIcon('hail')).toEqual(<HailIcon className="icon" />);
    expect(generateIcon('thunderstorm')).toEqual(<ThunderstormIcon className="icon" />);
    expect(generateIcon('tornado')).toEqual(<TornadoIcon className="icon" />);
    expect(generateIcon()).toEqual(null);
  });

  it ('should only display the "cloudy night" icon if "defaultToDay" is true', function() {
    expect(generateIcon('partly-cloudy-night')).toEqual(<NightAltCloudyIcon className="icon" />);
    expect(generateIcon('partly-cloudy-night', true)).toEqual(<DayCloudyIcon className="icon" />);
  });
})

describe('fahrenheitToCelsius', function() {
  it ('converts fahrenheit values to celsius values', function() {
    expect(fahrenheitToCelsius(32)).toEqual(0);
    expect(fahrenheitToCelsius(50)).toEqual(10);
    expect(fahrenheitToCelsius(77)).toEqual(25);
  })
})
