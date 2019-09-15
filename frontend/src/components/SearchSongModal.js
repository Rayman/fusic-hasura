import React from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

function SearchResults({ data, loading, error }) {
  if (loading) return 'Loading...';
  if (error) throw error;

  return <code>{'Result:' + JSON.stringify(data)}</code>;
}

SearchSongModal.propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

export function SearchSongModal({ show, onHide, onSearch, result }) {
  function onSubmit(e) {
    e.preventDefault();
    onSearch(e.target['q'].value);
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
        <SearchResults {...result} />
      </Modal.Body>
    </Modal>
  );
}

SearchSongModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  result: PropTypes.shape({
    data: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
  }).isRequired,
};

export const SEARCH_SONG = gql`
  query($q: String!) {
    search(q: $q) {
      id
      title
    }
  }
`;

export default function SearchSongModalContainer({ show, onHide }) {
  const [search, result] = useLazyQuery(SEARCH_SONG);

  function onSearch(q) {
    search({ variables: { q } });
  }

  return (
    <SearchSongModal
      show={show}
      onHide={onHide}
      onSearch={onSearch}
      result={result}
    />
  );
}

SearchSongModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
