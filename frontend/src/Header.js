import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import { Home, Radio, Music } from 'react-feather';

import { useAuth } from './Auth';

export default function Header({ children }) {
  const { login, logout, isAuthenticated } = useAuth();

  return (
    <>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">
          Company name
        </a>
        <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            {isAuthenticated() ? (
              <Button variant="link" className="nav-link" onClick={logout}>
                Sign Out
              </Button>
            ) : (
              <Button variant="link" className="nav-link" onClick={login}>
                Sign in
              </Button>
            )}
          </li>
        </ul>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="/">
                    <Home className="feather" /> Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <Radio className="feather" /> Radio
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <Music className="feather" />
                    Music
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          {children}
        </div>
      </div>
    </>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
