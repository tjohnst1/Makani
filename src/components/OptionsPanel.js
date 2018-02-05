import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/options-panel.scss';

export default class OptionsPanel extends Component {
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
    updateUnitOfMeasurement: PropTypes.func.isRequired,
  }
  render() {
    const { location, unitOfMeasurement, updateUnitOfMeasurement } = this.props;
    return (
      <div className="options-panel">
        <div className="options-panel__input-group">
          <label htmlFor="location">City, State, or Zip Code</label>
          <input type="text" name="location" value={location.zip} />
        </div>
        <div className="options-panel__input-group">
          <label htmlFor="measurement-type">Unit of Measurement:</label>
          <select value={unitOfMeasurement} onChange={(e) => updateUnitOfMeasurement(e.target.value)}>
            <option value="fahrenheit">Fahrenheit</option>
            <option value="celsius">Celsius</option>
          </select>
        </div>
      </div>
    );
  }
}
