import { React, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Cookies from 'js-cookie';

// Blocks
import Login from './login';

// Components
import { useUserContext } from '../components/user/use-user-context';
import { PopupProvider } from '../components/popup/use-popup-context';
import { SidebarProvider } from '../components/sidebar/use-sidebar-context';
import Navbar from '../components/navbar/navbar';
import Toolbar from '../components/toolbar/toolbar';
import Sidebar from '../components/sidebar/sidebar';

// Views
import Overview from '../views/overview';

function App() {
  const { user, setUser } = useUserContext();
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
              setUser(user);
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
        <SidebarProvider>
          <Toolbar />
          <Sidebar />
        </SidebarProvider>

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
