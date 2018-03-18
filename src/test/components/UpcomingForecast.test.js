import React from 'react';
import { shallow } from 'enzyme';

import UpcomingForecast from '../../components/UpcomingForecast';

describe('<UpcomingForecast />', function() {
  const props = {
    day: "Sunday",
    icon: "partly-cloudy-day",
    temp: 45.620000000000005,
  }
  const upcomingForecast = shallow(<UpcomingForecast { ...props }/>);

  it('should render without error', function() {
    expect(upcomingForecast.is('.upcoming-forecast__date')).toBe(true);
  });

  it('should display a icon, temperature, and day based on the props', function() {
    expect(upcomingForecast.children().find('.icon').exists()).toBe(true);
    expect(upcomingForecast.children().find('.upcoming-forecast__temp').props().children).toEqual([46, "°"]);
    expect(upcomingForecast.children().find('.upcoming-forecast__day').props().children).toEqual('Sunday');
  });

});
