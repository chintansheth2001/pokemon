import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';

import Filterbox from './components/filterbox/Filterbox';

import Home from './pages/Home'
import Details from './pages/Details';
import Error from './pages/Error';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles['app']} >


    <Router>
      <Filterbox/>
      <Routes>
        <Route path="/" element={<Navigate to="/1" />} />
        <Route path="/:page" element={<Home />}/>
        <Route path="/details/:name" element={<Details />}/>
        <Route path="*" element={<Error />} />
      </Routes>
    {/*  */}
    </Router>
    </div>
  );
}

export default App;
