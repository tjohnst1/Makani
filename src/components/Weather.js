import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UpcomingForecast from './UpcomingForecast';
import classNames from 'classnames';
import { generateIcon } from '../helpers/helpers';
import '../styles/weather.scss'

class Weather extends Component {
  static propTypes = {
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
      zip: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      country: PropTypes.string,
    }).isRequired,
    currentWeather: PropTypes.shape({
      temp: PropTypes.number,
      feelsLike: PropTypes.number,
      summary: PropTypes.string,
      icon: PropTypes.string,
      unitOfMeasurement: PropTypes.string,
    }),
    forecast: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        temp: PropTypes.number,
        day: PropTypes.string,
      })
    ).isRequired,
    flipped: PropTypes.bool.isRequired,
  };

  render() {
    const { location, currentWeather, forecast, flipped } = this.props;
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
          {generateIcon(currentWeather.icon)}
        </div>
        <p className="weather__summary">{currentWeather.summary}</p>
        <div className="weather__temp">
          <p>{Math.round(currentWeather.temp)}&deg;</p>
          <p className="weather__feels-like">Feels like {Math.round(currentWeather.feelsLike)}&deg;</p>
        </div>
        <div className="weather__upcoming">
          {forecast.map((data, i) => <UpcomingForecast icon={data.icon} temp={data.temp} day={data.day} key={i} />)}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { card, currentWeather, location, forecast } = state;
  return {
    flipped: card.flipped,
    currentWeather,
    forecast,
    location,
  }
}

export default connect(mapStateToProps)(Weather);
