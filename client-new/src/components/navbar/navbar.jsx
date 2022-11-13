import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../assets/scss/components/navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/">Overview</NavLink>
        </li>

        <li>
          <NavLink to="/history">History</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
