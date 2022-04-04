import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import styles from './Landing.module.scss'
import { Footer } from '../../components'
import { LanListGames, LanDonkeyPlay, LanCharacters } from '../../assets'

const Landing = () => {
  const [optSelect, setOptSelect] = useState(null)
  const viewText = {
    visible: i => ({
      x: 0, opacity: 1, transition: { delay: i * 0.4 }
    }),
    hidden: { x: -200, opacity: 0 }
  }
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Level Up</title>
        </Helmet>
      </HelmetProvider>
      <main id={styles.landing}>
        <section id={styles.principal}>
          <div id={styles.content}>
            <motion.h1
              id={styles.title}
              custom={1}
              initial='hidden'
              animate='visible'
              variants={viewText}
            >
              Disfruta del mundo de los <b>videojuegos </b>
            </motion.h1>
            <motion.p
              id={styles.desc}
              custom={2}
              initial='hidden'
              animate='visible'
              variants={viewText}
            >
              Explora el amplio catálogo de juegos que tenemos para ti.
              Encuentra tus éxitos de taquilla favoritos según el filtro que desees,
              y si no lo encuentras? Puedes crearlo.
            </motion.p>
          </div>
          <motion.img
            src={LanCharacters}
            id={styles.personajesGames}
            whileHover={{ scale: [1, 1.05, 1] }}
            alt='Personajes de tus Videojuegos Favoritos'
          />
        </section>

        <section id={styles.cards}>
          <Link
            to='/games'
            onMouseLeave={() => setOptSelect(null)}
            onMouseEnter={() => setOptSelect('games')}
            className={`${styles.card__item}
              ${optSelect === 'games' ? styles.select : styles.deselect}
            `}
          >
            <img
              alt='Videojuegos'
              src={LanListGames}
              className={styles.card__img}
            />
            <div className={styles.card__content}>
              <h2>Todos los Juegos</h2>
              <p>Accede a más de 100 juegos, busca y encuentra tu juego favorito.</p>
            </div>
          </Link>
          <Link
            to='/create'
            onMouseLeave={() => setOptSelect(null)}
            onMouseEnter={() => setOptSelect('create')}
            className={`${styles.card__item}
              ${optSelect === 'create' ? styles.select : styles.deselect}
            `}
          >
            <img
              alt='Create Game'
              src={LanDonkeyPlay}
              className={styles.card__img}
            />
            <div className={styles.card__content}>
              <h2>Publica tu Juego</h2>
              <p>No esperes más y publica tu juego, para mostrárselo a todo el mundo.</p>
            </div>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Landing
