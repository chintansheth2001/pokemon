import React from 'react';
import CardListing from "./components/cardlisting/CardListing";
import styles from './App.module.css';

function App() {
  return (
    <div className={styles['app']} >
      <CardListing />
    </div>
  );
}

export default App;
