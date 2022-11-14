import React from 'react';

// Components
import { useUserContext } from '../user/use-user-context';

// Styles
import '../../assets/scss/components/avatar.scss';

function Avatar() {
  const { user } = useUserContext();

  return (
    <div className="avatar">
      <img src={user.picture} alt="avatar" />
    </div>
  );
}

export default Avatar;
