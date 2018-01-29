import React, { Component } from 'react';
import Forecast from '../components/Forecast';
import '../styles/app.scss';

class App extends Component {
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
    this.setCityByCoords = this.setCityByCoords.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  geolocateUser() {
    return fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_KEY}`, { method: 'POST' })
      .then(response => response.json())
      .then(json => this.setState({
        location: {
          lat: json.location.lat,
          lng: json.location.lng,
        },
      }))
  }

  setCityByCoords() {
    const { lat, lng } = this.state.location;
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key==${process.env.REACT_APP_GOOGLE_KEY}`)
      .then(response => response.json())
      .then(json => {
        // check that something was indeed found
        if (json.status === 'OK') {
          json.results.forEach(result => {
            // find the postal code address component and set values based off of what is found
            if (result.types[0] === 'postal_code') {
              result.address_components.forEach(addressComponent => {
                switch (addressComponent.types[0]) {
                  case 'postal_code':
                    return this.setState({
                      location: {
                        zip: addressComponent.long_name,
                      }
                    });
                  case 'locality':
                    return this.setState({
                      location: {
                        city: addressComponent.long_name,
                      }
                    });
                  case 'administrative_area_level_1':
                    return this.setState({
                      location: {
                        state: addressComponent.long_name,
                      }
                    });
                  case 'country':
                    return this.setState({
                      location: {
                        country: addressComponent.short_name,
                      }
                    });
                  default:
                    return;
                }
              })
            }
          })
        }
      })
  }

  getWeather() {
    const { lat, lng } = this.state.location;
    return fetch(`https://api.darksky.net/forecast/${process.env.REACT_APP_DS_KEY}/${lat},${lng}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          temp: {
            current: json.currently.temperature,
            feelsLike: json.currently.apparentTemperature,
            summary: json.currently.summary,
            icon: json.currently.icon,
          },
          upcoming: [
            {
              temp: (json.daily[1].temperatureHigh + json.daily[1].temperatureLow) / 2,
              icon: json.daily[1].icon,
            },
            {
              temp: (json.daily[2].temperatureHigh + json.daily[2].temperatureLow) / 2,
              icon: json.daily[2].icon,
            },
            {
              temp: (json.daily[3].temperatureHigh + json.daily[3].temperatureLow) / 2,
              icon: json.daily[3].icon,
            },
          ],
        })
      })
  }

  componentDidMount() {
    fetch('http://localhost:8080/ping')
      .then(response => response.json())
      .then(json => console.log(json));
    // this.geolocateUser()
    //   .then(() => this.setCityByCoords())
    //   .then(() => this.getWeather())
  }

  render() {
    return (
      <div className="app">
        <svg className="app__setup" width="30" height="30" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm512-109v222q0 12-8 23t-20 13l-185 28q-19 54-39 91 35 50 107 138 10 12 10 25t-9 23q-27 37-99 108t-94 71q-12 0-26-9l-138-108q-44 23-91 38-16 136-29 186-7 28-36 28h-222q-14 0-24.5-8.5t-11.5-21.5l-28-184q-49-16-90-37l-141 107q-10 9-25 9-14 0-25-11-126-114-165-168-7-10-7-23 0-12 8-23 15-21 51-66.5t54-70.5q-27-50-41-99l-183-27q-13-2-21-12.5t-8-23.5v-222q0-12 8-23t19-13l186-28q14-46 39-92-40-57-107-138-10-12-10-24 0-10 9-23 26-36 98.5-107.5t94.5-71.5q13 0 26 10l138 107q44-23 91-38 16-136 29-186 7-28 36-28h222q14 0 24.5 8.5t11.5 21.5l28 184q49 16 90 37l142-107q9-9 24-9 13 0 25 10 129 119 165 170 7 8 7 22 0 12-8 23-15 21-51 66.5t-54 70.5q26 50 41 98l183 28q13 2 21 12.5t8 23.5z"/></svg>
        <Forecast />
        <p>{this.state.location.lat}, {this.state.location.lng}</p>
      </div>
    );
  }
}

export default App;
