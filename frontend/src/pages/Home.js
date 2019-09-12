import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useSubscription, useMutation } from '@apollo/react-hooks';

import './Home.css';

export const RADIOS_SUBSCRIPTION = gql`
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
  const { loading, data } = useSubscription(RADIOS_SUBSCRIPTION);

  if (loading) return <div>Loading...</div>;

  const { radio: radios } = data;
  return (
    <ul>
      {radios.map(({ id, title }) => (
        <li key={id}>
          <Link to={`/radio/${id}`}>
            {id} - {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function CreateRadio() {
  const [addRadio] = useMutation(INSERT_RADIO_MUTATION);

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

export default function Home2() {
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1>Radio list:</h1>
      </div>

      <RadioList />
      <h1>Create a new radio:</h1>
      <CreateRadio />
    </main>
  );
}
