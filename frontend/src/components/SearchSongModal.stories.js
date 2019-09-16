import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { SearchSongModal } from './SearchSongModal';

storiesOf('Search song modal', module).add('initial', () => (
  <SearchSongModal
    show={true}
    onHide={action('onHide')}
    q={''}
    onSearch={action('onSearch')}
    result={{
      data: undefined,
      loading: false,
      error: null,
    }}
  />
));

storiesOf('Search song modal', module).add('loading', () => (
  <SearchSongModal
    show={true}
    onHide={action('onHide')}
    q={''}
    onSearch={action('onSearch')}
    result={{
      data: undefined,
      loading: true,
      error: null,
    }}
  />
));

const exampleData = {
  search: [
    {
      id: 'ySjXFjLTagQ',
      title: 'Wolfmother - Joker and the Thief',
      description: 'Wolfmother - Joker and the Thief.',
      thumbnail: 'https://i.ytimg.com/vi/ySjXFjLTagQ/default.jpg',
    },
    {
      id: 'PZDg_MLmp7M',
      title: 'Wolfmother - Victorious (Official Video)',
      description:
        'Download, Buy or Stream Victorious by Wolfmother taken from the album Victorious: https://UMA.lnk.to/WolfMotherVictoriousID Subscribe to the official ...',
      thumbnail: 'https://i.ytimg.com/vi/PZDg_MLmp7M/default.jpg',
    },
    {
      id: 'TCYM6UgJi3I',
      title: 'Wolfmother - Woman (Lyrics)',
      description:
        'Artist - Wolfmother Song - Woman Album- Wolfmother (Self-titled)',
      thumbnail: 'https://i.ytimg.com/vi/TCYM6UgJi3I/default.jpg',
    },
    {
      id: 'f8yPqjxSLC8',
      title:
        'Wolfmother Greatest Hits Full Album 2018 - The Best Of Wolfmother',
      description:
        "Wolfmother Greatest Hits Full Album 2018 - The Best Of Wolfmother https://youtu.be/f8yPqjxSLC8 ✓Don't forget LIKE - SHARE - COMMENT.",
      thumbnail: 'https://i.ytimg.com/vi/f8yPqjxSLC8/default.jpg',
    },
    {
      id: 'IRsc57nK8mg',
      title: 'Wolfmother - Woman (Official Video)',
      description:
        'Download, Buy or Stream Woman/Love Train by Wolfmother taken from the album Wolfmother: https://UMA.lnk.to/WolfmotherDeluxeID Subscribe to the official ...',
      thumbnail: 'https://i.ytimg.com/vi/IRsc57nK8mg/default.jpg',
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
