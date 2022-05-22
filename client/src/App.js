import { React } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';

import Overview from './components/Overview/Overview.js';
import Deposit from './components/Deposit/Deposit.js';
import Toolbar from './components/Toolbar/Toolbar.js';

function App() {
  return (
    <div className="wrapper">
      <Toolbar />

      <Routes>
        <Route path="/overview" element={<Overview />} />

        <Route path="/deposit" element={<Deposit />} />
      </Routes>

      <Navbar />
    </div>
  );
}

export default App;
