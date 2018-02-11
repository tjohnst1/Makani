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

  constructor(props) {
    super(props);
    this.state = {
      location: props.location.zip,
    }
    this.updateAndFlip = this.updateAndFlip.bind(this);
  }

  updateLocation(value) {
    this.setState({location: value})
  }

  updateAndFlip(cityInfo) {
    this.props.updateCityInfo(cityInfo);
    this.props.toggleCard();
  }

  render() {
    const { location, unitOfMeasurement, updateUnitOfMeasurement } = this.props;
    return (
      <div className="options-panel">
        <div className="options-panel__input-group">
          <label htmlFor="location">City, State, or Zip Code</label>
          <input type="text" name="location" value={this.state.location} onChange={e => this.updateLocation(e.target.value)} />
        </div>
        <div className="options-panel__input-group">
          <label htmlFor="measurement-type">Unit of Measurement:</label>
          <select value={unitOfMeasurement} onChange={(e) => updateUnitOfMeasurement(e.target.value)}>
            <option value="fahrenheit">Fahrenheit</option>
            <option value="celsius">Celsius</option>
          </select>
        </div>
        <div className="options-panel__btn-container">
          <button className="options-panel__btn" onClick={() => this.updateAndFlip(this.state.location)}>Done</button>
        </div>
      </div>
    );
  }
}
