import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';


import styles from './Pagination.module.css'

const Pagination = ({ totalPage }) => {
  let { page } = useParams();

  let navigate = useNavigate()

  return (
    <div className={styles['action-bar']}>
      <button className={styles['action-bar__button']} disabled={page <= 1 || page > totalPage} onClick={() => navigate(Number(page) ? `/${Number(page) - 1}` : `/1`)} >Previous</button>
      <button className={styles['action-bar__button']} disabled={page >= totalPage || page < 1} onClick={() => navigate(Number(page) ? `/${Number(page) + 1}` : `/1`)}>Next</button>
    </div>
  )
}

export default Pagination