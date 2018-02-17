import React, { Component } from 'react';
import '../styles/error-msg.scss';

export default class Loading extends Component {
  render() {
    return (
      <div className="error-msg">
        <p>Unfortunately, There has been an error fetching your data. :(<br/> Please try again later.</p>
      </div>
    )
  }
}
