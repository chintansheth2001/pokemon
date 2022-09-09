import styles from './Filterbox.module.css'
const Filterbox = () => {
  return (
    <>
      <input className={styles['filter']} type="text" id="filter" placeholder="Search for pokemon.." title="Type pokemon name"></input>
    </>
  );
}

export default Filterbox;