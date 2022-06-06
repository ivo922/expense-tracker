import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/sessionSlice';

import 'js-cookie';

import './Logout.scss';
import Cookies from 'js-cookie';
import { toggleSidebar } from '../../redux/sidebarSlice';
import { useNavigate } from 'react-router-dom';

function Logout(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    Cookies.remove('session');
    navigate('/');
    dispatch(toggleSidebar());
    dispatch(removeUser());
  };

  return (
    <button className="Logout" onClick={handleClick}>
      {props.children}
    </button>
  );
}

export default Logout;
