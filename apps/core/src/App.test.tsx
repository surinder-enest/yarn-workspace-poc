import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import App from './App';

describe('App component', () => {
  let wrapper: ShallowWrapper;

  it('should be rendered without errors', () => {
    wrapper = shallow(<App />);
    expect(wrapper).toHaveLength(1);
  });
});
