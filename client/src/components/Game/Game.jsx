import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'

import styles from './Game.module.scss'
import { SpinnerLoading } from '../../components'

const Game = ({ key, id, name, genres, rating, img }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <Link
      key={key}
      to={`/game/${id}`}
      className={styles.game}
    >
      <img
        src={img}
        alt={`game${id}`}
        className={styles.fondo}
        onLoad={() => setLoaded(true)}
      />
      {!loaded &&
        <div id={styles.loadImage}>
          <SpinnerLoading />
        </div>}
      <div id={styles.info}>
        <div id={styles.left}>
          <h3 id={styles.title}>{name}</h3>
          <div id={styles.genres}>
            {genres.map((g, i) =>
              <span key={i}>{g.name || g}</span>
            )}
          </div>
        </div>
        <div id={styles.rating}>
          <FaStar className={styles.icon} />
          <p>{rating}</p>
        </div>
      </div>
    </Link>
  )
}

export default Game
