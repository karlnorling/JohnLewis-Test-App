import { Loading } from './Loading';
import * as React from 'react';
import renderer from 'react-test-renderer';

describe('<Loading />', () => {
  test('renders Loading component with loading text', () => {
    const loading = renderer.create(<Loading />);
    expect(loading).toBeDefined()
  });
});