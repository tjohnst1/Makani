import { combineReducers } from 'redux';
import location from './locationReducer'
import currentWeather from './currentWeatherReducer'
import forecast from './forecastReducer'
import error from './errorReducer'
import card from './cardReducer'

export default combineReducers({
  location,
  currentWeather,
  forecast,
  error,
  card,
})
