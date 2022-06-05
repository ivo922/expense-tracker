import React from 'react';
import { useSelector } from 'react-redux';
import Accounts from '../Accounts/Accounts';
import Avatar from '../Avatar/Avatar';

import './Toolbar.scss';

function Toolbar() {
  return (
    <div className="Toolbar">
      <Accounts />

      <Avatar />
    </div>
  );
}

export default Toolbar;
