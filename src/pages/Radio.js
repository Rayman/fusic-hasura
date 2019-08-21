import React from 'react';

export default function Radio({
  match: {
    params: { id },
  },
}) {
  return (
    <main>
      <h1>Radio (id={id})</h1>
    </main>
  );
}
