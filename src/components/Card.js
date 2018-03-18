import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Weather from './Weather';
import OptionsPanel from './OptionsPanel';
import Loading from './Loading';
import { getWeatherInfo } from '../actions/weatherActions';
import '../styles/card.scss'

export class Card extends Component {
  static propTypes = {
    flipped: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
    handleGetWeatherInfo: PropTypes.func.isRequired,
  }

  static defaultProps = {
    loading: true,
  }

  componentDidMount() {
    this.props.handleGetWeatherInfo();
  }

  render() {
    const { flipped, loading } = this.props;
    const classes = classNames({
      card: true,
      flipped,
    })

    if (loading) {
      return <Loading />;
    }

    return (
      <div className="card__perspective-container">
        <div className={classes}>
          <Weather />
          <OptionsPanel />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { card, currentWeather } = state;
  return {
    flipped: card.flipped,
    loading: currentWeather.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleGetWeatherInfo: () => dispatch(getWeatherInfo())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
