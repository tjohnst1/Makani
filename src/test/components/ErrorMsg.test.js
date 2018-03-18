import React from 'react';
import { shallow } from 'enzyme';

import ErrorMsg from '../../components/ErrorMsg';

describe('<ErrorMsg />', function() {
  const props = {
    msg: 'This is a test',
  };
  const errorMsg = shallow(<ErrorMsg { ...props } />);

  it('should render without error', function() {
    expect(errorMsg.is('.error-msg')).toBe(true);
  });

  it('should show a error message', function() {
    expect(errorMsg.children().find('p').text()).toEqual('This is a test');
  });

});
