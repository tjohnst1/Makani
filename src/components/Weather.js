import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UpcomingForecast from './UpcomingForecast';
import classNames from 'classnames';
import { generateIcon } from '../helpers/helpers';
import '../styles/weather.scss'

export default class Forecast extends Component {
  static propTypes = {
    location: PropTypes.shape({
      lat: PropTypes.string,
      lng: PropTypes.string,
      zip: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      country: PropTypes.string,
    }).isRequired,
    temp: {
      current: PropTypes.string,
      feelsLike: PropTypes.string,
      summary: PropTypes.string,
      icon: PropTypes.string,
    },
    upcoming: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        temp: PropTypes.string,
        day: PropTypes.string,
      })
    ).isRequired,
    hide: false,
  };

  render() {
    const { location, temp, upcoming, flipped } = this.props;
    const classes = classNames({
      weather: true,
      flipped,
    });
    return (
      <div className={classes}>
        <div className="weather__header">
          <p className="weather__date">Today</p>
          <p className="weather__location">{location.city}</p>
        </div>
        <div className="weather__img">
          {generateIcon(temp.icon)}
          <p>{temp.summary}</p>
        </div>
        <div className="weather__temp">
          <p>{Math.round(temp.current)}&deg;</p>
          <p className="weather__feels-like">Feels like {Math.round(temp.feelsLike)}&deg;</p>
        </div>
        <div className="weather__upcoming">
          {upcoming.length > 0 ? upcoming.map((data, i) => <UpcomingForecast icon={data.icon} temp={data.temp} day={data.day} key={i} />) : null}
        </div>
      </div>
    )
  }
}
