import React from 'react';
import { useSelector } from 'react-redux';

import './Avatar.scss';

function Avatar() {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="Avatar">
      <img src={user.picture} alt="avatar" />
    </div>
  );
}

export default Avatar;
