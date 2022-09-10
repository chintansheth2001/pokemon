import React, { useEffect, useState } from 'react';
import Filterbox from '../filterbox/Filterbox'
import Card from '../card/Card'
import CardDetails from '../carddetails/CardDetails'
import Pagination from '../pagination/Pagination';

import axios from 'axios'

import styles from './CardListing.module.css'


const CardListing = () => {
  const [list, setList] = useState([])
  const [cURL, setCURL] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nURL, setNURL] = useState('')
  const [pURL, setPURL] = useState('https://pokeapi.co/api/v2/pokemon')
  const [pageStatus, setPageStatus] = useState(true)
  const [showDetail, setShowDetail] = useState(false)
  const [pokemanName, setPokemanName] = useState('')

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    setPageStatus(true)

    axios.get(cURL, { opts })
      .then(req => {
        setNURL(req.data.next);
        setPURL(req.data.previous);
        setList(req.data.results);
        setPageStatus(false);
      })

    return () => abortCtrl.abort();

  }, [cURL])

  const next = () => setCURL(nURL);
  const previous = () => setCURL(pURL);

  const handleClick = (show, name) => {
    setShowDetail(show)
    setPokemanName(name)
  }

  if (pageStatus) {
    return 'Show Loader'
  }

  return (
    <>
      <Filterbox handleOnEnter={handleClick} />

      {showDetail ?

        <CardDetails name={pokemanName} handleClick={handleClick} />
        :
        <div>
          <Pagination next={nURL ? next : null} previous={pURL ? previous : null} />
          <div className={styles['listing']}>
            {list.map((item, i) => {
              return <Card key={i} pokemon={item} handleClick={handleClick} />
            })}
          </div>
          <Pagination next={nURL ? next : null} previous={pURL ? previous : null} />
        </div>
      }


    </>

  );
}

export default CardListing;

