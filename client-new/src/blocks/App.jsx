import { React, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Cookies from 'js-cookie';

// import Overview from './components/Overview/Overview.js';
// import Toolbar from './components/Toolbar/Toolbar.js';
// import Login from './components/Login/Login.js';
// import Sidebar from './components/Sidebar/Sidebar.js';
// import History from './components/History/History.js';

// Blocks
import Login from './login';

// Components
import { useUserContext } from '../components/user/use-user-context';
import { PopupProvider } from '../components/popup/use-popup-context';
import Navbar from '../components/navbar/navbar';

// Views
import Overview from '../views/overview';

function App() {
  const { user, updateUser } = useUserContext();
  const userId = Cookies.get('session');

  useEffect(() => {
    const checkCookie = async () => {
      try {
        if (Object.keys(user).length == 0) {
          if (userId) {
            const response = await fetch(
              `http://localhost:5000/api/users/${userId}`
            );
            const user = await response.json();

            if (!!user) {
              updateUser(user);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkCookie();
  }, []);

  if (Object.keys(user).length == 0) {
    return <Login />;
  }

  return (
    <div className="wrapper">
      <PopupProvider>
        {/* <Toolbar />
      <Sidebar /> */}

        <Routes>
          <Route path="*" element={<Overview />} />

          {/* <Route path="/history" element={<History />} /> */}
        </Routes>

        <Navbar />
      </PopupProvider>
    </div>
  );
}

export default App;
