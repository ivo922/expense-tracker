import { React, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

import Navbar from './components/Navbar/Navbar.js';
import Overview from './components/Overview/Overview.js';
import Deposit from './components/Deposit/Deposit.js';
import Toolbar from './components/Toolbar/Toolbar.js';
import Login from './components/Login/Login.js';
import { updateSession } from './redux/sessionSlice.js';

function App() {
  const user = useSelector((state) => state.session.user);
  const userId = Cookies.get('session');
  const dispatch = useDispatch();

  useEffect(() => {
    const checkForCookie = async () => {
      try {
        if (Object.keys(user).length == 0) {
          if (userId) {
            const response = await fetch(`http://localhost:5000/api/user/${userId}`);
            const user = await response.json();
            if (!!user) {
              dispatch(updateSession(user));
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    checkForCookie();
  }, []);

  if (Object.keys(user).length == 0) {
    return <Login />;
  }

  return (
    <div className="wrapper">
      <Toolbar />

      <Routes>
        <Route path="/" element={<Overview />} />

        <Route path="/deposit" element={<Deposit />} />
      </Routes>

      <Navbar />
    </div>
  );
}

export default App;
