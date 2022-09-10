import Filterbox from '../filterbox/Filterbox'
import Card from '../card/Card'

import styles from './CardListing.module.css'

const CardListing = () => {
  return (
    <>
      <Filterbox />
      <div className={styles['listing']}>
        {[...(new Array(20))].map(() => { return <Card /> })}
      </div>
    </>

  );
}

export default CardListing;