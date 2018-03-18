import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateWeatherInfoIfNeeded } from '../actions/weatherActions';
import '../styles/options-panel.scss';

export class OptionsPanel extends Component {
  static propTypes = {
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
      zip: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      country: PropTypes.string,
    }).isRequired,
    unitOfMeasurement: PropTypes.string.isRequired,
    handleUpdateWeatherInfoIfNeeded: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      query: props.location.zip,
      unitOfMeasurement: props.unitOfMeasurement,
    }
  }

  updateState(key, value) {
    this.setState({[key]: value})
  }

  render() {
    const { query, unitOfMeasurement } = this.state;
    const { handleUpdateWeatherInfoIfNeeded } = this.props;
    const newValues = {
      query: this.state.query,
      weather: {
        unitOfMeasurement: this.state.unitOfMeasurement,
      }
    }
    return (
      <div className="options-panel">
        <div className="options-panel__input-group">
          <label htmlFor="query">City, State, or Zip Code</label>
          <input type="text" name="query" value={query} onChange={e => this.updateState('query', e.target.value)} />
        </div>
        <div className="options-panel__input-group">
          <label htmlFor="measurement-type">Unit of Measurement:</label>
          <select value={unitOfMeasurement} onChange={(e) => this.updateState('unitOfMeasurement', e.target.value)}>
            <option value="fahrenheit">Fahrenheit</option>
            <option value="celsius">Celsius</option>
          </select>
        </div>
        <div className="options-panel__btn-container">
          <button className="options-panel__btn" onClick={() => handleUpdateWeatherInfoIfNeeded(newValues)}>Done</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { location, currentWeather } = state;
  return {
    location,
    unitOfMeasurement: currentWeather.unitOfMeasurement,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleUpdateWeatherInfoIfNeeded: newValues => {
      dispatch(updateWeatherInfoIfNeeded(newValues));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsPanel);
