import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import { Edit } from 'react-feather';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './Radio.css';

const SEARCH_SONG = gql`
  query($q: String!) {
    search(q: $q) {
      id
      title
    }
  }
`;

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

function SearchResults({ q }) {
  console.log(q);
  const { data, error, loading } = useQuery(SEARCH_SONG, { variables: { q } });
  if (loading) return 'Loading...';
  if (error) throw error;

  return <code>{'Result:' + JSON.stringify(data)}</code>;
}

function AddSong() {
  const [q, setQ] = useState();

  function onSubmit(e) {
    e.preventDefault();

    const search = e.target['search'].value;
    setQ(search);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <h2>Add a song</h2>
        <input type="search" name="search" placeholder="search..." />
        <input type="submit" value="Search!" />
      </form>
      {q && <SearchResults q={q} />}
    </>
  );
}

function EditRadio({ show, onHide, radio: { id, title, artwork_url } }) {
  function onSave(e) {}

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

EditRadio.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  radio: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artwork_url: PropTypes.string.isRequired,
  }).isRequired,
};

export default function Radio({
  match: {
    params: { id },
  },
}) {
  const [edit, setEdit] = useState(false);

  const { loading, data, error } = useSubscription(RADIOS_SUBSCRIPTION, {
    variables: { id },
  });

  if (loading) return 'Loading...';
  if (error) throw error;

  const { radio_by_pk: radio } = data;
  const { title, created_at, artwork_url } = radio;

  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1>
          {title}{' '}
          <Button variant="link" onClick={() => setEdit(true)}>
            <Edit />
          </Button>
        </h1>

        <p className="lead">Created {created_at}</p>
      </div>
      <AddSong />
      <ul>
        <li>song</li>
      </ul>
      {<EditRadio show={edit} onHide={() => setEdit(false)} radio={radio} />}
    </main>
  );
}
