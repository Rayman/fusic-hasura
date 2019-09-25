import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth';

export default function Callback({ history }) {
  const { parseHash } = useAuth();
  const [err, setErr] = useState(null);

  useEffect(() => {
    parseHash()
      .then(result => {
        console.log("Use is authenticated, let's redirect");
        history.push('/');
      })
      .catch(err => {
        console.error('handleAuthentication err', err);
        setErr(err);
      });
  }, []);

  return err ? <code>{err}</code> : <div>Loading...</div>;
}
