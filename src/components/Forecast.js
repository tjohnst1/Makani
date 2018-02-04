import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UpcomingForecast from './UpcomingForecast';
import '../styles/forecast.scss'

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
  };

  render() {
    const { location, temp, upcoming } = this.props;
    return (
      <div className="forecast">
        <div className="forecast__header">
          <p className="forecast__date">Today</p>
          <p className="forecast__location">{location.city}</p>
        </div>
        <div className="forecast__img">
          <svg style={{margin: "0 auto"}} width="150" height="150" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1472 896q0-117-45.5-223.5t-123-184-184-123-223.5-45.5-223.5 45.5-184 123-123 184-45.5 223.5 45.5 223.5 123 184 184 123 223.5 45.5 223.5-45.5 184-123 123-184 45.5-223.5zm276 277q-4 15-20 20l-292 96v306q0 16-13 26-15 10-29 4l-292-94-180 248q-10 13-26 13t-26-13l-180-248-292 94q-14 6-29-4-13-10-13-26v-306l-292-96q-16-5-20-20-5-17 4-29l180-248-180-248q-9-13-4-29 4-15 20-20l292-96v-306q0-16 13-26 15-10 29-4l292 94 180-248q9-12 26-12t26 12l180 248 292-94q14-6 29 4 13 10 13 26v306l292 96q16 5 20 20 5 16-4 29l-180 248 180 248q9 12 4 29z"/></svg>
          <p>{temp.description}</p>
        </div>
        <div className="forecast__temp">
          <p>{Math.round(temp.current)}&deg;</p>
          <p className="forecast__feels-like">Feels like {Math.round(temp.feelsLike)}&deg;</p>
          <p>{temp.summary}</p>
        </div>
        <div className="forecast__upcoming">
          {upcoming.length > 0 ? upcoming.map((data, i) => <UpcomingForecast icon={data.icon} temp={data.temp} day={data.day} key={i} />) : null}
        </div>
      </div>
    )
  }
}
