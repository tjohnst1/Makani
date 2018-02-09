import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Weather from './Weather';
import OptionsPanel from './OptionsPanel';
import Loading from './Loading';
import classNames from 'classnames';
import '../styles/card.scss'

export default class Card extends Component {
  static propTypes = {
    flipped: PropTypes.bool.isRequired,
    toggleCard: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: null,
        lng: null,
        zip: null,
        city: null,
        state: null,
        country: null,
      },
      temp: {
        current: null,
        feelsLike: null,
        summary: null,
        icon: null,
        unitOfMeasurement: 'fahrenheit',
      },
      upcoming: [],
    }
    this.geolocateUser = this.geolocateUser.bind(this);
    this.getCityInfoFromCoords = this.getCityInfoFromCoords.bind(this);
    this.getCityInfoFromLocation = this.getCityInfoFromLocation.bind(this);
    this.getCityInfoFromLocation = this.getCityInfoFromLocation.bind(this);
    this.getWeatherInfo = this.getWeatherInfo.bind(this);
    this.updateUnitOfMeasurement = this.updateUnitOfMeasurement.bind(this);
    this.updateCityInfo = this.updateCityInfo.bind(this);
  }

  geolocateUser() {
    return fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_KEY}`, { method: 'POST' })
      .then(response => response.json())
      .then(json => ({
        lat: json.location.lat,
        lng: json.location.lng,
      }))
  }

  getCityInfoFromCoords(coords) {
    const { lat, lng } = coords;
    return fetch(`/api/city/${lat}/${lng}`)
      .then(res => res.json())
      .then(json => {
        return ({
          lat: lat,
          lng: lng,
          zip: json.zip,
          city: json.city,
          state: json.state,
          country: json.country,
        })
      })
  }

  getCityInfoFromLocation(location) {
    return fetch(`/api/city/${location}`)
      .then(res => res.json())
      .then(json => {
        return ({
          lat: json.lat,
          lng: json.lng,
          zip: json.zip,
          city: json.city,
          state: json.state,
          country: json.country,
        })
      })
  }

  getWeatherInfo(cityInfo) {
    const { lat, lng } = cityInfo;
    return fetch(`/api/weather/${lat}/${lng}`)
      .then(res => res.json())
      .then(json => {
        const units = cityInfo.country === 'US' ? 'fahrenheit' : 'celsius';
        return {
        location: cityInfo,
        temp: Object.assign({}, json.temp, {unitOfMeasurement: units}),
        upcoming: json.upcoming,
        }
      })
  }

  updateUnitOfMeasurement(unit) {
    this.setState({
      temp: {
        ...this.state.temp,
        unitOfMeasurement: unit,
      }
    })
  }

  updateCityInfo(location) {
    this.getCityInfoFromLocation(location)
      .then(cityInfo => this.getWeatherInfo(cityInfo))
      .then(completeInfo => {
        this.setState({
          location: completeInfo.location,
          temp: completeInfo.temp,
          upcoming: completeInfo.upcoming,
        })
      });
  }

  componentDidMount() {
    this.geolocateUser()
      .then(coords => this.getCityInfoFromCoords(coords))
      .then(cityInfo => this.getWeatherInfo(cityInfo))
      .then(completeInfo => {
        this.setState({
          location: completeInfo.location,
          temp: completeInfo.temp,
          upcoming: completeInfo.upcoming,
        })
      });
  }

  render() {
    const { location, temp, upcoming } = this.state;
    const { flipped, toggleCard } = this.props;
    const props = { location, temp, upcoming };
    const classes = classNames({
      card: true,
      flipped,
    })

    if (!location.lat) {
      return <Loading />;
    }

    return (
      <div className="card__perspective-container">
        <div className={classes}>
          <Weather {...props} />
          <OptionsPanel
            unitOfMeasurement={temp.unitOfMeasurement}
            location={location}
            updateUnitOfMeasurement={this.updateUnitOfMeasurement}
            updateCityInfo={this.updateCityInfo}
            toggleCard={toggleCard}
          />
        </div>
      </div>
    )
  }
}
