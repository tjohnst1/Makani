import React, { Component } from 'react';
import Forecast from '../components/Forecast';
import '../styles/app.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Forecast />
      </div>
    );
  }
}

export default App;
