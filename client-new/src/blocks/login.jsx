import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';

import { useUserContext } from '../components/user/use-user-context';

import '../assets/scss/components/login.scss';

const Login = () => {
  useEffect(() => {
    document.title = 'Sign In';
  }, []);

  const { setUser } = useUserContext();

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
      setUser(user);
      Cookies.set('session', user._id, { expires: 1 });
    }
  };

  return (
    <div className="login">
      <div className="login__inner">
        <h2 className="login__title">Please Sign In to access your account.</h2>

        <GoogleLogin onSuccess={responseGoogle} onError={responseGoogle} />
      </div>
    </div>
  );
}

export default Login;
