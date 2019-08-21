import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

export default function Header() {
  return (
    <main>
      In the future you can login here. Go back to <Link to="/">Home</Link>
    </main>
  );
}
