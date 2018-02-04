import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Weather from './Weather';
import classNames from 'classnames';
import '../styles/card.scss'

export default class Card extends Component {
  static propTypes = {
    flipped: PropTypes.bool.isRequired,
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
      },
      upcoming: [],
    }
    this.geolocateUser = this.geolocateUser.bind(this);
    this.getCityInfo = this.getCityInfo.bind(this);
    this.getWeatherInfo = this.getWeatherInfo.bind(this);
  }

  geolocateUser() {
    return fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_KEY}`, { method: 'POST' })
      .then(response => response.json())
      .then(json => ({
        lat: json.location.lat,
        lng: json.location.lng,
      }))
  }

  getCityInfo(coords) {
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

  getWeatherInfo(cityInfo) {
    const { lat, lng } = cityInfo;
    return fetch(`/api/weather/${lat}/${lng}`)
      .then(res => res.json())
      .then(json => ({
        location: cityInfo,
        temp: json.temp,
        upcoming: json.upcoming,
      }))
  }

  componentDidMount() {
    this.geolocateUser()
      .then(coords => this.getCityInfo(coords))
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
    console.log(this.props)
    const { flipped } = this.props;
    const props = { location, temp, upcoming, flipped };
    const classes = classNames({
      card: true,
      flipped,
    })
    return (
      <div className={classes}>
        <Weather {...props} />
      </div>
    )
  }
}
