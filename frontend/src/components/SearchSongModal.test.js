import React from 'react';
import ReactDOM from 'react-dom';
import { MockedProvider } from '@apollo/react-testing';
import SearchSongModal from './SearchSongModal';

const mocks = [];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MockedProvider mocks={[]} addTypename={false}>
      <SearchSongModal
        show={true}
        onHide={() => {
          throw Error();
        }}
        radio_id="someid"
      />
    </MockedProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
