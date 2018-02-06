import test from 'ava';
import { shallow } from 'enzyme';

import * as React from 'react';

import Control from '../../../components/control';

test('has a .Control class name', t => {
  t.pass();
  const wrapper = shallow(<Control model="test" />);
  t.true(wrapper.hasClass('Control'));
});
