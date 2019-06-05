import { Loading } from './Loading';
import * as React from 'react';
import { shallow } from 'enzyme';

describe('<Loading />', () => {
  test('renders Loading component with loading text', () => {
    const loading = shallow(<Loading />);
    expect(loading).toBe(<Loading />);
  });
});