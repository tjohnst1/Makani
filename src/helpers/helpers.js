import React from 'react';
import CloudyIcon from '../img/cloudy.svg';
import DayCloudyIcon from '../img/day-cloudy.svg';
import DaySunnyIcon from '../img/day-sunny.svg';
import FogIcon from '../img/fog.svg';
import HailIcon from '../img/hail.svg';
import NightAltCloudyIcon from '../img/night-alt-cloudy.svg';
import NightClearIcon from '../img/night-clear.svg';
import RainIcon from '../img/rain.svg';
import SleetIcon from '../img/sleet.svg';
import SnowIcon from '../img/snow.svg';
import ThunderstormIcon from '../img/thunderstorm.svg';
import TornadoIcon from '../img/tornado.svg';
import WindyIcon from '../img/windy.svg';

// the default case has been added because dark sky sometimes returns "night" icon values
export function generateIcon(name, defaultToDay = false) {
  switch (name) {
    case 'clear-day':
      return <DaySunnyIcon className="icon" />;
    case 'clear-night':
      return <NightClearIcon className="icon" />;
    case 'rain':
      return <RainIcon className="icon" />;
    case 'snow':
      return <SnowIcon className="icon" />;
    case 'sleet':
      return <SleetIcon className="icon" />;
    case 'wind':
      return <WindyIcon className="icon" />;
    case 'fog':
      return <FogIcon className="icon" />;
    case 'cloudy':
      return <CloudyIcon className="icon" />;
    case 'partly-cloudy-day':
      return <DayCloudyIcon className="icon" />;
    case 'partly-cloudy-night':
      if (defaultToDay) {
        return <DayCloudyIcon className="icon" />;
      }
      return <NightAltCloudyIcon className="icon" />;
    case 'hail':
      return <HailIcon className="icon" />;
    case 'thunderstorm':
      return <ThunderstormIcon className="icon" />;
    case 'tornado':
      return <TornadoIcon className="icon" />;
    default:
      return null;
  }
}

export function fahrenheitToCelsius(temp) {
  return (5 / 9) * (temp - 32);
}
