import React from 'react';
import { shallow } from 'enzyme';

import { App } from '../../containers/App';

describe('<App />', function() {
  const props = {
    handleToggleCard: jest.fn(),
  }
  const wrapper = shallow(<App { ...props }/>);

  it('should render two components', function() {
    expect(wrapper.children()).toHaveLength(2);
  });

});
