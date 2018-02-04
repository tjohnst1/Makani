import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/forecast.scss'

export default class UpcomingForecast extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    temp: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
  };

  render() {
    const { icon, temp, day } = this.props;
    return (
      <div className="forcast__upcoming-date">
        <svg style={{margin: "0 auto",}} width="30" height="30" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1472 896q0-117-45.5-223.5t-123-184-184-123-223.5-45.5-223.5 45.5-184 123-123 184-45.5 223.5 45.5 223.5 123 184 184 123 223.5 45.5 223.5-45.5 184-123 123-184 45.5-223.5zm276 277q-4 15-20 20l-292 96v306q0 16-13 26-15 10-29 4l-292-94-180 248q-10 13-26 13t-26-13l-180-248-292 94q-14 6-29-4-13-10-13-26v-306l-292-96q-16-5-20-20-5-17 4-29l180-248-180-248q-9-13-4-29 4-15 20-20l292-96v-306q0-16 13-26 15-10 29-4l292 94 180-248q9-12 26-12t26 12l180 248 292-94q14-6 29 4 13 10 13 26v306l292 96q16 5 20 20 5 16-4 29l-180 248 180 248q9 12 4 29z"/></svg>
        <p>{Math.round(temp)}&deg;</p>
        <p>{day}</p>
      </div>
    )
  }
}
