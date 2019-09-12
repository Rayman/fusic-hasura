import React from 'react';
import { MockedProvider } from '@apollo/react-testing';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import SearchSongModal, { SEARCH_SONG } from './SearchSongModal';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

const mocks = [
  {
    request: {
      query: SEARCH_SONG,
      variables: {
        q: 'wolfmother',
      },
    },
    result: {
      data: {
        search: [
          {
            id: 'ySjXFjLTagQ',
            title: 'Wolfmother - Joker and the Thief',
            __typename: 'SearchResult',
          },
          {
            id: 'PZDg_MLmp7M',
            title: 'Wolfmother - Victorious (Official Video)',
            __typename: 'SearchResult',
          },
          {
            id: 'f8yPqjxSLC8',
            title:
              'Wolfmother Greatest Hits Full Album 2018 - The Best Of Wolfmother',
            __typename: 'SearchResult',
          },
          {
            id: 'TCYM6UgJi3I',
            title: 'Wolfmother - Woman (Lyrics)',
            __typename: 'SearchResult',
          },
          {
            id: 'IRsc57nK8mg',
            title: 'Wolfmother - Woman (Official Video)',
            __typename: 'SearchResult',
          },
        ],
      },
    },
  },
];

storiesOf('Search song modal', module).add('wolfmother', () => (
  <MockedProvider mocks={mocks}>
    <SearchSongModal
      show={true}
      onHide={action('onHide')}
      radio_id={'someid'}
    />
  </MockedProvider>
));