import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="nav">
      <NavLink
        exact
        className="nav-link"
        activeStyle={{ color: '#343a40' }}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className="nav-link"
        activeStyle={{ color: '#343a40' }}
        to="/book"
      >
        Book
      </NavLink>
    </nav>
  );
};

export default Navigation;
