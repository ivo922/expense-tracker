import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/sidebarSlice';
import Logout from '../Logout/Logout';
import ProfileDetails from '../ProfileDetails/ProfileDetails';

import './Sidebar.scss';

function Sidebar() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  return (
    <div className={`Sidebar ${isOpen ? 'active' : ''}`}>
      <header className="Sidebar__head">
        <button
          className="Sidebar__close"
          onClick={() => {
            dispatch(toggleSidebar());
          }}
        >
          &#10005;
        </button>

        <h3 className="Sidebar__title">My Profile</h3>
      </header>

      <div className="Sidebar__body">
        <ProfileDetails />
      </div>

      <footer className="Sidebar__foot">
        <Logout>Logout</Logout>
      </footer>
    </div>
  );
}

export default Sidebar;
