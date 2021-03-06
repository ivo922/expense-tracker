import { React, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSession } from './redux/sessionSlice.js';

import Cookies from 'js-cookie';

import Navbar from './components/Navbar/Navbar.js';
import Overview from './components/Overview/Overview.js';
import Toolbar from './components/Toolbar/Toolbar.js';
import Login from './components/Login/Login.js';
import Sidebar from './components/Sidebar/Sidebar.js';
import History from './components/History/History.js';

function App() {
  const user = useSelector((state) => state.session.user);
  const userId = Cookies.get('session');
  const dispatch = useDispatch();

  useEffect(() => {
    const checkForCookie = async () => {
      try {
        if (Object.keys(user).length == 0) {
          if (userId) {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`);
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
      <Sidebar />

      <Routes>
        <Route path="/" element={<Overview />} />

        <Route path="/history" element={<History />} />
      </Routes>

      <Navbar />
    </div>
  );
}

export default App;
