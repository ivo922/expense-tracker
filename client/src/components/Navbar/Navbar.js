import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';

function Navbar() {
  return (
    <nav className="Navbar">
      <ul>
        <li>
          <NavLink to="/overview">Overview</NavLink>
        </li>

        <li>
          <NavLink to="/history">History</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
