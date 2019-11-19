import React, { useState } from 'react';
import { gql } from 'graphql.macro';
import { useSubscription } from '@apollo/react-hooks';

import { Edit, PlusCircle } from 'react-feather';
import Button from 'react-bootstrap/Button';

import EditRadioModal from '../components/EditRadioModal';
import SearchSongModal from '../components/SearchSongModal';

import './Radio.css';

const RADIOS_SUBSCRIPTION = gql`
  subscription($id: uuid!) {
    radio_by_pk(id: $id) {
      id
      created_at
      artwork_url
      title
    }
  }
`;

export default function Radio({
  match: {
    params: { id },
  },
}) {
  const [edit, setEdit] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const { loading, data, error } = useSubscription(RADIOS_SUBSCRIPTION, {
    variables: { id },
  });

  if (loading) return 'Loading...';
  if (error) throw error;

  const { radio_by_pk: radio } = data;
  const { title, created_at } = radio;

  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1>
          {title}{' '}
          <Button variant="link" onClick={() => setEdit(true)}>
            <Edit />
          </Button>
          <Button
            className="Radio__add"
            variant="link"
            onClick={() => setShowSearch(true)}
          >
            <PlusCircle />
          </Button>
        </h1>

        <p className="lead">Created {created_at}</p>
      </div>
      <ul>
        <li>song</li>
      </ul>
      {
        <EditRadioModal
          show={edit}
          onHide={() => setEdit(false)}
          radio={radio}
        />
      }
      {
        <SearchSongModal
          show={showSearch}
          onHide={() => setShowSearch(false)}
          radio_id={id}
        />
      }
    </main>
  );
}
