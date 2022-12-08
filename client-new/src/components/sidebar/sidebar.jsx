import React from 'react';

// Blocks
import Accounts from '../accounts/accounts';

// Components
import { useSidebarContext } from './use-sidebar-context';
import SidebarProfile from './sidebar-profile';
import AccountsLogout from '../accounts/accounts-logout';

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

      <footer className="sidebar__foot">
        <AccountsLogout>Logout</AccountsLogout>
      </footer>
    </div>
  );
}

export default Sidebar;
