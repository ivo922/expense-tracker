import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Components
import { useSidebarContext } from '../sidebar/use-sidebar-context';
import { useUserContext } from '../user/use-user-context';

// Styles
import '../../assets/scss/components/accounts-logout.scss';

function AccountsLogout(props) {
  const navigate = useNavigate();
  const { closeSidebar } = useSidebarContext();
  const { setUser } = useUserContext();

  const handleClick = () => {
    Cookies.remove('session');
    navigate('/');
    closeSidebar();
    setUser({});
  };

  return (
    <button className="accounts-logout" onClick={handleClick}>
      {props.children}
    </button>
  );
}

export default AccountsLogout;
