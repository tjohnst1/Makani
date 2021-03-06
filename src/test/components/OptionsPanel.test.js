import React from 'react';
import { shallow } from 'enzyme';

import { OptionsPanel } from '../../components/OptionsPanel';

describe('<OptionsPanel />', function() {
  const props = {
    location: {
      lat: 45.532283,
      lng: -122.630281,
      zip: '97232',
      city: 'Portland',
      state: 'Oregon',
      country: 'US',
    },
    unitOfMeasurement: 'fahrenheit',
    handleUpdateWeatherInfoIfNeeded: jest.fn(),
  }
  const optionsPanel = shallow(<OptionsPanel { ...props }/>);

  it('should render without error', function() {
    expect(optionsPanel.is('.options-panel')).toBe(true);
  });

  it('should display the current zipcode + unit of measurement values', function() {
    expect(optionsPanel.children().find('input[name="query"]').props().value).toEqual('97232');
    expect(optionsPanel.children().find('select').props().value).toEqual('fahrenheit');
  });

  it('should change state when the user adds info to the form fields', function() {
    optionsPanel.children().find('input[name="query"]').simulate('change', { target: { value: '11205' } })
    optionsPanel.children().find('select').simulate('change', { target: { value: 'celsius' } })
    expect(optionsPanel.state()).toEqual({"query": "11205", "unitOfMeasurement": "celsius"})
  });

  it('should dispatch handleUpdateWeatherInfoIfNeeded when the done button is clicked', function() {
    // optionsPanel.find('button').simulate('click')
    console.log(optionsPanel.props())
    expect()
  });

});
