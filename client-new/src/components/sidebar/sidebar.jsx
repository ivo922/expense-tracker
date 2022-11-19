import React from 'react';
// import Logout from '../Logout/Logout';

// Blocks
import Accounts from '../../blocks/accounts';

// Components
import { useSidebarContext } from './use-sidebar-context';
import SidebarProfile from './sidebar-profile';

// Styles
import '../../assets/scss/components/sidebar.scss';

function Sidebar() {
  const { sidebarState, closeSidebar } = useSidebarContext();

  return (
    <div className={`sidebar ${sidebarState ? 'active' : ''}`}>
      <header className="sidebar__head">
        <button
          className="sidebar__close"
          onClick={() => {
            closeSidebar();
          }}
        >
          &#10005;
        </button>

        <h3 className="sidebar__title">My Profile</h3>
      </header>

      <div className="sidebar__body">
        <SidebarProfile />

        <Accounts />
      </div>

      <footer className="sidebar__foot">{/* <Logout>Logout</Logout> */}</footer>
    </div>
  );
}

export default Sidebar;
