import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../redux/sidebarSlice';
import Accounts from '../Accounts/Accounts';
import Avatar from '../Avatar/Avatar';

import './Toolbar.scss';

function Toolbar() {
  const dispatch = useDispatch();

  return (
    <div className="Toolbar">
      <Accounts />

      <div
        className="Toolbar__avatar"
        onClick={() => {
          dispatch(toggleSidebar());
        }}
      >
        <Avatar />
      </div>
    </div>
  );
}

export default Toolbar;
