import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Filterbox.module.css'

import axios from 'axios'

const Filterbox = ({ handleOnEnter }) => {
  const [allPokemon, setAllPokemon] = useState([])
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)

  let navigate = useNavigate()

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    setLoadingStatus(true)

    axios.get('https://pokeapi.co/api/v2/pokemon/?limit=-1', { opts })
      .then(req => {
        setAllPokemon(req.data.results);
        setLoadingStatus(false)
      })

    return () => abortCtrl.abort();

  }, [])

  useEffect(() => {
    const handleCloseMenu = (e) => {
      if (e.target.id !== 'filter') {
        setSearchFocus(false)
      }
    }
    document.addEventListener('click', handleCloseMenu)
    return () => document.body.removeEventListener('click', handleCloseMenu)
  }, [])

  const inputChange = (event) => {
    setSearchText(event.target.value)
  }


  if (loadingStatus) {
    return 'Show Loader'
  }

  return (
    <div className={styles['wrapper']}
    >
      <input
        className={styles['filter']}
        type="text" id="filter"
        placeholder="Search for pokemon.."
        title="Type pokemon name"
        onFocus={() => {
          setSearchFocus(true)
        }}


        onKeyUp={(event) => {
          inputChange(event)
        }}
      />
      {searchFocus &&
        <div className={styles['filter__list']}>
          {allPokemon.filter((val) => {
            if (searchText === "") {
              return val
            } else if (val.name.toLowerCase().includes(searchText.toLowerCase())) {
              return val
            }

          }).map((val, key) => {
            return (
              <div
                onClick={(e) => navigate(`/details/${val.name}`)}

                className={styles['filter__item']}
                key={key} tabIndex="0">
                {val.name}
              </div>
            )

          })}
        </div>
      }
    </div>
  );
}

export default Filterbox;