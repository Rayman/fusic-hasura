import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';

function App() {
  return (
    <Router>
      <>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NoMatch} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
