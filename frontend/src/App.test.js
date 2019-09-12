import React from 'react';
import ReactDOM from 'react-dom';
import { MockedProvider } from '@apollo/react-testing';

import App, { RADIOS_SUBSCRIPTION } from './App';

const mocks = [
  {
    request: {
      query: RADIOS_SUBSCRIPTION,
      variables: {},
    },
    result: {
      data: {
        radio: {
          id: '1',
          created_at: 'today',
          artwork_url: 'someurl',
          title: 'sometitle',
        },
      },
    },
  },
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MockedProvider mocks={mocks}>
      <App />
    </MockedProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
