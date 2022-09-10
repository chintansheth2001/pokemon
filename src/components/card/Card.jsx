import React, { useEffect, useState } from 'react';
import axios from 'axios'

import styles from './Card.module.css'
const Card = ({ pokemon }) => {


  const [pokemonItem, setPokemonItem] = useState({})
  const [imageUrl, setImageUrl] = useState('')


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
      <div className={styles['card']}>
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