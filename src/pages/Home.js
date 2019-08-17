import React from 'react';
import gql from 'graphql-tag';
import { useSubscription } from 'react-apollo-hooks';

const COMMENTS_SUBSCRIPTION = gql`
  subscription {
    radio {
      id
      created_at
      artwork_url
      title
    }
  }
`;

function RadioList() {
  const {
    data: { radio: radios },
    loading,
  } = useSubscription(COMMENTS_SUBSCRIPTION);
  return (
    <ul>
      {radios.map(radio => (
        <li>radio.id</li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <>
      <h1>Radio list:</h1>
    </>
  );
}
