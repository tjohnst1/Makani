import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { generateIcon } from '../helpers/helpers';
import '../styles/upcoming-forecast.scss'

export default class UpcomingForecast extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    day: PropTypes.string.isRequired,
  };

  render() {
    const { icon, temp, day } = this.props;
    return (
      <div className="upcoming-forecast__date">
        {generateIcon(icon)}
        <p>{Math.round(temp)}&deg;</p>
        <p>{day}</p>
      </div>
    )
  }
}
