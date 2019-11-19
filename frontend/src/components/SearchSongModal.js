import React, { useRef, useEffect } from 'react';
import { gql } from 'graphql.macro';
import { useLazyQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';
import Media from 'react-bootstrap/Media';

export const SEARCH_SONG = gql`
  query($q: String!) {
    search(q: $q) {
      id
      title
      description
      thumbnail
    }
  }
`;

function SearchResults({ data, loading, error }) {
  if (loading)
    return (
      <p>
        Loading <Spinner as="span" size="sm" animation="grow" />
      </p>
    );
  if (error) throw error;
  if (!data) return null;

  console.log(data);
  return (
    <ul className="list-unstyled">
      {data.search.map((r, i) => (
        <Media as="li" key={i}>
          <img
            width={64}
            height={64}
            className="mr-3"
            src={r.thumbnail}
            alt=""
          />
          <Media.Body>
            <h5>{r.title}</h5>
            <p>{r.description}</p>
          </Media.Body>
        </Media>
      ))}
    </ul>
  );
}

SearchSongModal.propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

export function SearchSongModal({ show, onHide, onSearch, result }) {
  const inputRef = useRef(null);

  // focus input element on first render
  useEffect(() => {
    if (show) inputRef.current.focus();
  }, [show]);

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
            <FormControl placeholder="Search..." name="q" ref={inputRef} />
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
