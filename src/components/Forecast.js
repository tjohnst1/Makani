import React, { Component } from 'react';
import '../styles/forecast.scss'

export default class Forecast extends Component {
  render() {
    return (
      <div className="forecast">
        <h1 className="forecast__location">Current Location</h1>
        <div>
          <h2>Current Weather Condition</h2>
        </div>
        <div>
          <h3>Current Temp</h3>
          <p>Daily High Daily Low</p>
        </div>
      </div>
    )
  }
}
