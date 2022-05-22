import React from 'react';
import { NavLink } from 'react-router-dom';

import './Operations.scss';

function Operations() {
  return (
    <div className="Operations">
      <NavLink to="/deposit">Deposit</NavLink>

      <NavLink to="/withdrawal">Withdrawal</NavLink>

      <NavLink to="/transfer">Transfer</NavLink>
    </div>
  );
}

export default Operations;
