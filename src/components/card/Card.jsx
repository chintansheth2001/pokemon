import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import styles from './Card.module.css'
const Card = ({ pokemon }) => {


  const [pokemonItem, setPokemonItem] = useState({})
  const [imageUrl, setImageUrl] = useState('')
  const navigate = useNavigate()


  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };

    axios.get(pokemon.url, { opts })
      .then(req => {
        setImageUrl(req.data.sprites.other['official-artwork'].front_default)
        setPokemonItem(req.data)
      })

    return () => abortCtrl.abort();

  }, [])



  return (
    <>
      <div className={styles['card']} onClick={() => navigate(`/details/${pokemonItem.name}`)}>
        <img className={styles['card__img']} src={imageUrl} alt="" />
        <div className={styles['card__details']}>
          <div className={styles['name']}><strong>{pokemonItem.name}</strong></div>
          <div className={styles['pokemon-id']}># {pokemonItem.id}</div>
        </div>
      </div>
    </>
  );
}

export default Card;