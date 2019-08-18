import React from 'react';
import gql from 'graphql-tag';
import { useSubscription, useMutation } from '@apollo/react-hooks';

import './Home.css';

const RADIOS_SUBSCRIPTION = gql`
  subscription {
    radio {
      id
      created_at
      artwork_url
      title
    }
  }
`;

const INSERT_RADIO_MUTATION = gql`
  mutation($title: String!, $artwork_url: String!) {
    insert_radio(objects: { title: $title, artwork_url: $artwork_url }) {
      returning {
        id
      }
    }
  }
`;

function RadioList() {
  const { loading, error, data } = useSubscription(RADIOS_SUBSCRIPTION);

  if (loading) return <div>Loading...</div>;

  const { radio: radios } = data;
  return (
    <ul>
      {radios.map(({ id, title, artwork_url }) => (
        <li key={id}>
          {id} - {title}
        </li>
      ))}
    </ul>
  );
}

function CreateRadio() {
  const [addRadio, { returnData }] = useMutation(INSERT_RADIO_MUTATION);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log('Create radio:', data);

    addRadio({ variables: data });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="title" />
      </label>
      <label>
        Artwork url:
        <input type="text" name="artwork_url" />
      </label>
      <input type="submit" value="Create!" />
    </form>
  );
}

export default function Home() {
  return (
    <div className="Home">
      <h1>Radio list:</h1>
      <RadioList />
      <CreateRadio />
    </div>
  );
}
