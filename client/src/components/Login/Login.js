import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { updateSession } from '../../redux/sessionSlice';

import 'js-cookie';

import './Login.scss';
import Cookies from 'js-cookie';

function Login() {
  const dispatch = useDispatch();

  const responseGoogle = async (googleData) => {
    const res = await fetch('http://localhost:5000/api/v1/auth/google', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.credential,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200 || res.status === 201) {
      const user = await res.json();
      dispatch(updateSession(user));
      Cookies.set('session', user._id, { expires: 1 });
    }
  };

  return (
    <div className="Login">
      <div className="Login__inner">
        <h2 className="Login__title">Please log in to access your account.</h2>

        <GoogleLogin onSuccess={responseGoogle} onError={responseGoogle} />
      </div>
    </div>
  );
}

export default Login;
