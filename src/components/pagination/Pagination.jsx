import React from 'react';
import styles from './Pagination.module.css'

const Pagination = ({ next, previous }) => {
  return (
    <div className={styles['action-bar']}>
      <button className={styles['action-bar__button']} disabled={!previous} onClick={previous}>Previous</button>
      <button className={styles['action-bar__button']} disabled={!next} onClick={next}>Next</button>
    </div>
  )
}

export default Pagination