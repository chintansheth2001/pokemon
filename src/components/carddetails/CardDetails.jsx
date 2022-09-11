import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

import styles from './CardDetails.module.css'
import bstyles from '../pagination/Pagination.module.css'
const CardDetails = () => {


  const [pokemonItem, setPokemonItem] = useState({})
  const [imageUrl, setImageUrl] = useState('')
  const [abilities, setAbilities] = useState([])
  const [moves, setMoves] = useState([])
  const [stats, setStats] = useState([])

  let navigate = useNavigate()
  let { name } = useParams()
  const [nameState, setNameState] = useState(name)

  useEffect(() => {
    setNameState(name)
  })
  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };


    axios.get(`https://pokeapi.co/api/v2/pokemon/${nameState}`, { opts })
      .then(req => {
        setImageUrl(req.data.sprites.other['official-artwork'].front_default);
        setAbilities(req.data.abilities);
        setMoves(req.data.moves);
        setStats(req.data.stats);
        setPokemonItem(req.data)
      })

    return () => abortCtrl.abort();

  }, [nameState])



  return (
    <>
      <div className={bstyles['action-bar']}>
        <button className={bstyles['action-bar__button']} onClick={() => navigate('/')} >Back</button>
      </div>
      <div className={styles['card']}>
        <figure className={styles['card__figure']}>
          <h1 className={styles['card__name']}>{pokemonItem.name}</h1>
          <img className={styles['card__img']} src={imageUrl} alt="" />
        </figure>
        <h3 className={styles['card__title']}>Details</h3>
        <div className={styles['card__details']}>

          <div className={styles['card__row']}>
            <div className={styles['card__label']}>ID</div>
            <div className={styles['card__data']}><strong># {pokemonItem.id}</strong></div>
          </div>
          <div className={styles['card__row']}>
            <div className={styles['card__label']}>Height</div>
            <div className={styles['card__data']}><strong>{pokemonItem.height}</strong></div>
          </div>
          <div className={styles['card__row']}>
            <div className={styles['card__label']}>Weight</div>
            <div className={styles['card__data']}><strong>{pokemonItem.weight}</strong></div>
          </div>

        </div>
        <h3 className={styles['card__title']}>Abilities</h3>
        <div className={styles['card__details']}>

          {abilities.map((i, key) => {
            return (
              <div className={styles['card__row']} key={key}>
                <div className={styles['card__data']}>{i.ability.name}</div>
              </div>
            )
          })}
        </div>
        <h3 className={styles['card__title']}>Moves</h3>
        <div className={styles['card__details']}>

          {moves.map((i, key) => {
            return (
              <div className={styles['card__row']} key={key}>
                <div className={styles['card__data']}>{i.move.name}</div>
              </div>
            )
          })}

        </div>
        <h3 className={styles['card__title']}>Stats</h3>
        <div className={styles['card__details']}>

          {stats.map((i, key) => {
            return (
              <div className={styles['card__row']} key={key}>
                <div className={styles['card__data']}>{i.stat.name}</div>
              </div>
            )
          })}

        </div>
      </div>
    </>
  );
}

export default CardDetails;