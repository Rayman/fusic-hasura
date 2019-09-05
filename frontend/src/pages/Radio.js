import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import './Radio.css';

const SEARCH_SONG = gql`
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
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1>Radio</h1>
        <h4>id={id}</h4>
      </div>
      <AddSong />
      <ul>
        <li>song</li>
      </ul>
    </main>
  );
}
