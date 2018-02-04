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

export function generateIcon(name, className = "icon") {
  switch (name) {
    case 'clear-day':
      return <DaySunnyIcon className={className} />;
    case 'clear-night':
      return <NightClearIcon className={className} />;
    case 'rain':
      return <RainIcon className={className} />;
    case 'snow':
      return <SnowIcon className={className} />;
    case 'sleet':
      return <SleetIcon className={className} />;
    case 'wind':
      return <WindyIcon className={className} />;
    case 'fog':
      return <FogIcon className={className} />;
    case 'cloudy':
      return <CloudyIcon className={className} />;
    case 'partly-cloudy-day':
      return <DayCloudyIcon className={className} />;
    case 'partly-cloudy-night':
      return <NightAltCloudyIcon className={className} />;
    case 'hail':
      return <HailIcon className={className} />;
    case 'thunderstorm':
      return <ThunderstormIcon className={className} />;
    case 'tornado':
      return <TornadoIcon className={className} />;
    default:
      return null;
  }
}
