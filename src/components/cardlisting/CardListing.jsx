import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../card/Card'
import Pagination from '../pagination/Pagination';

import axios from 'axios'

import styles from './CardListing.module.css'


const CardListing = () => {
  let { page } = useParams()
  const [list, setList] = useState([])
  const [pageStatus, setPageStatus] = useState(true)
  const [totalPage, setTotalPage] = useState(1)
  const [currentPage, setCuttentPage] = useState(page)

  useEffect(() => {
    setCuttentPage(page)
  })

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    setPageStatus(true)


    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(Number(currentPage) - 1) * 20}&limit=20`, { opts })
      .then(req => {
        setList(req.data.results);
        setPageStatus(false);
        setTotalPage(Math.ceil(req.data.count / 20))
      })

    return () => abortCtrl.abort();

  }, [currentPage])




  if (pageStatus) {
    return 'Show Loader'
  }

  return (
    <>
      <Pagination totalPage={totalPage} />
      <div className={styles['listing']}>
        {list.map((item, i) => {
          return <Card key={i} pokemon={item} />
        })}
      </div>
      <Pagination totalPage={totalPage} />
    </>
  );
}

export default CardListing;

