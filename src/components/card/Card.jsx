import styles from './Card.module.css'
const Card = () => {
  return (
    <>
      <div className={styles['card']}>
        <img className={styles['card__img']} src="https://via.placeholder.com/100" alt="" />
        <div className={styles['card__details']}>
          <div className={styles['name']}><strong>Name</strong></div>
          <div className={styles['pokemon-id']}>#pokemonID</div>
        </div>
      </div>
    </>
  );
}

export default Card;