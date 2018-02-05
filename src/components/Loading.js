import React, { Component } from 'react';
import '../styles/loading.scss';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading__container">
        <div className="loading">
          <div className="loading__circle1 loading__child"></div>
          <div className="loading__circle2 loading__child"></div>
          <div className="loading__circle3 loading__child"></div>
          <div className="loading__circle4 loading__child"></div>
          <div className="loading__circle5 loading__child"></div>
          <div className="loading__circle6 loading__child"></div>
          <div className="loading__circle7 loading__child"></div>
          <div className="loading__circle8 loading__child"></div>
          <div className="loading__circle9 loading__child"></div>
          <div className="loading__circle10 loading__child"></div>
          <div className="loading__circle11 loading__child"></div>
          <div className="loading__circle12 loading__child"></div>
        </div>
      </div>
    )
  }
}
