import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar/Avatar';

import './ProfileDetails.scss';

function ProfileDetails() {
  const { name, email } = useSelector((state) => state.session.user);

  return (
    <div className="ProfileDetails">
      <Avatar />

      <h4 className="name">{name}</h4>

      <h4 className="email">{email}</h4>
    </div>
  );
}

export default ProfileDetails;
