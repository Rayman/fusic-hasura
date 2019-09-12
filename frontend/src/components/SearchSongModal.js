import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

export const SEARCH_SONG = gql`
  query($q: String!) {
    search(q: $q) {
      id
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

export default function SearchSongModal({ show, onHide }) {
  const [q, setQ] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    setQ(e.target['q'].value);
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add a song</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <InputGroup className="mb-3">
            <FormControl placeholder="Search..." name="q" />
            <InputGroup.Append>
              <Button type="submit" variant="outline-primary">
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        {q && <SearchResults q={q} />}
      </Modal.Body>
    </Modal>
  );
}

SearchSongModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  radio_id: PropTypes.string.isRequired,
};
