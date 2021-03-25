import { Loading } from './Loading';
import * as React from 'react';
import { shallow } from 'enzyme';

describe('<Loading />', () => {
  test('renders Loading component', () => {
    const loading = shallow(<Loading />);
    expect(loading).toBeDefined();
  });
});