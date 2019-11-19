import React from 'react';
import { gql } from 'graphql.macro';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const UPDATE_RADIO = gql`
  mutation($id: uuid, $title: String!, $artwork_url: String!) {
    update_radio(
      _set: { title: $title, artwork_url: $artwork_url }
      where: { id: { _eq: $id } }
    ) {
      affected_rows
    }
  }
`;

export default function EditRadio({
  show,
  onHide,
  radio: { id, title, artwork_url },
}) {
  const [updateRadio, { loading }] = useMutation(UPDATE_RADIO);

  function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    updateRadio({ variables: { id, ...data } }).then(() => {
      onHide();
    });
  }

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit radio details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formRadioTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" defaultValue={title} />
            </Form.Group>

            <Form.Group controlId="formRadioArtworkUrl">
              <Form.Label>Artwork url</Form.Label>
              <Form.Control
                type="url"
                name="artwork_url"
                defaultValue={artwork_url}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
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
