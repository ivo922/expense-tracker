import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../redux/sidebarSlice';
import AccountsDropdown from '../AccountsDropdown/AccountsDropdown';
import Avatar from '../Avatar/Avatar';

import './Toolbar.scss';

function Toolbar() {
  const dispatch = useDispatch();

  return (
    <div className="Toolbar">
      <AccountsDropdown />

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
