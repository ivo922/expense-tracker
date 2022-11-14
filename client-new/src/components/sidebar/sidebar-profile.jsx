import React from 'react';

// Components
import Avatar from '../Avatar/Avatar';
import { useUserContext } from '../user/use-user-context';

function SidebarProfile() {
const { user } = useUserContext();

  return (
    <div className="sidebar__profile">
      <Avatar />

      <h4 className="sidebar__details-name">{user.name}</h4>

      <h4 className="sidebar__details-email">{user.email}</h4>
    </div>
  );
}

export default SidebarProfile;
