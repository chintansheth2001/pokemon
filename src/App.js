import Filterbox from "./components/filterbox/Filterbox";
import CardListing from "./components/cardlisting/CardListing";
import styles from './App.module.css';

function App() {
  return (
    <div className={styles['app']} >
      <Filterbox />
      <CardListing />
    </div>
  );
}

export default App;
