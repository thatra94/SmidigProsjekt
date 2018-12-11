import React from 'react';
import App from '../App.js';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(App).toJSON();
  expect(tree).toMatchSnapshot();
});
