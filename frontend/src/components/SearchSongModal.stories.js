import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { SearchSongModal } from './SearchSongModal';

function SearchSongModalLoading() {
  const result = {
    data: undefined,
    loading: true,
    error: null,
  };
  return (
    <SearchSongModal
      show={true}
      onHide={action('onHide')}
      q={''}
      onSearch={action('onSearch')}
      result={result}
    />
  );
}

storiesOf('Search song modal', module).add('loading', () => (
  <SearchSongModalLoading />
));

const exampleData = {
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
};

function SearchSongModalWrapped() {
  const result = {
    data: exampleData,
    loading: false,
    error: null,
  };
  return (
    <SearchSongModal
      show={true}
      onHide={action('onHide')}
      q={''}
      onSearch={action('onSearch')}
      result={result}
    />
  );
}

storiesOf('Search song modal', module).add('wolfmother', () => (
  <SearchSongModalWrapped />
));
