import React from 'react';
import { shallow } from 'enzyme';

import Loading from '../../components/Loading';

describe('<Loading />', function() {
  const props = {
    msg: 'This is a test',
  };
  const loading = shallow(<Loading { ...props } />);

  it('should render without error', function() {
    expect(loading.is('.loading__container')).toBe(true);
  });

});
