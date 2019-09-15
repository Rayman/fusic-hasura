import React from 'react';
import { MockedProvider } from '@apollo/react-testing';

import { storiesOf } from '@storybook/react';

import App from './App';
import { RADIOS_SUBSCRIPTION } from './pages/Home';

const mocks = [
  {
    request: {
      query: RADIOS_SUBSCRIPTION,
      variables: {},
    },
    result: {
      data: {},
    },
  },
];

storiesOf('App', module).add('example', () => (
  <MockedProvider mocks={mocks}>
    <App />
  </MockedProvider>
));
