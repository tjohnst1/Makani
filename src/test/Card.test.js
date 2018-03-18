import React from 'react';
import { shallow } from 'enzyme';

import { Card } from '../components/Card';

describe('<Card />', function() {
  const props = {
    flipped: false,
    loading: false,
    handleGetWeatherInfo: jest.fn(),
  };
  const card = shallow(<Card { ...props } />);

  it('should render without error', function() {
    expect(card.is('.card__perspective-container')).toBe(true);
  });

  it('should render two components', function() {
    expect(card.children().children()).toHaveLength(2);
  });

  it('should flip over', function() {
    expect(card.find('.flipped').exists()).toBe(false);
    card.setProps({ flipped: true });
    expect(card.find('.flipped').exists()).toBe(true);
  });

  it('should show the loading component', function() {
    expect(card.is('.loading__container')).toBe(false);
    card.setProps({ loading: true });
    expect(card.render().is('.loading__container')).toBe(true);
  });

});
