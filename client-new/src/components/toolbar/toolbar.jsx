import React from 'react';

// Components
import AccountsDropdown from '../accounts/accounts-dropdown';
import Avatar from '../avatar/avatar';
import { useSidebarContext } from '../sidebar/use-sidebar-context';

// Styles
import '../../assets/scss/components/toolbar.scss';

function Toolbar() {
  const { openSidebar } = useSidebarContext();

  return (
    <div className="toolbar">
      <AccountsDropdown />

      <div
        className="toolbar__avatar"
        onClick={() => {
          openSidebar();
        }}
      >
        <Avatar />
      </div>
    </div>
  );
}

export default Toolbar;
