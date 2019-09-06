import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from '@apollo/react-hooks';

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

export default function Radio({
  match: {
    params: { id },
  },
}) {
  const { loading, data, error } = useSubscription(RADIOS_SUBSCRIPTION, {
    variables: { id },
  });

  if (loading) return 'Loading...';
  if (error) throw error;

  const {
    radio_by_pk: { title, created_at, artwork_url },
  } = data;

  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1>{title}</h1>
        <p class="lead">Created {created_at}</p>
      </div>
      <AddSong />
      <ul>
        <li>song</li>
      </ul>
    </main>
  );
}
