import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaFilter } from 'react-icons/fa'

import styles from './ListGames.module.scss'
import { Game, Pagination, LoadingGames } from '../index'
import { getGamesAll, setBarFilter, setGamesNow, setGamesView, setNewGame, setPage } from '../../redux/actions'

const ListGames = () => {
  const dispatch = useDispatch()
  const {
    gamesAll, gamesView, gamesNow, page, history, newGame
  } = useSelector(state => state)

  const [cambio, setCambio] = useState(false)

  useEffect(() => {
    if (!gamesAll.length || newGame) {
      dispatch(setNewGame(false))
      dispatch(getGamesAll())
    }
  }, [])

  // useEffect(() => {
  //   setCambio(true)
  //   setTimeout(() => setCambio(false), 100)
  // }, [page, gamesNow])

  // useEffect(() => {
  //   setCambio(true)
  //   setTimeout(() => setCambio(false), 8000)
  // }, [history])

  const gamesPage = gamesView ? gamesView.slice(page * 15 - 15, page * 15) : []

  if (!gamesPage.length && gamesView.length) {
    dispatch(setPage(Math.ceil(gamesView.length / 15)))
  }

  return (
    <article id={styles.listGames}>
      <header id={styles.options}>
        <div
          id={styles.switchFilter}
          onClick={() => dispatch(setBarFilter())}
        >
          <FaFilter />
          <h3>Filter</h3>
        </div>
        {gamesNow === 'name' &&
          <h3
            id={styles.clearFilters}
            onClick={() => {
              dispatch(setGamesNow('all'))
              dispatch(setGamesView(gamesAll))
            }}
          >Borrar resultados
          </h3>}
      </header>
      <section className={styles.sectionGames}>
        <div className={styles.infoGames}>
          <h2>{gamesNow === 'all'
            ? 'Todos los Juegos'
            : `Búsquedas Relacionadas con ${history[0]}`}
          </h2>
          <Pagination size={gamesView.length} />
        </div>
        <div className={styles.contentGames}>
          {gamesView
            ? (gamesView.length && !cambio)
                ? gamesPage.map((g, i) =>
                  <Game
                    key={i}
                    name={g.name}
                    genres={g.genres}
                    rating={g.rating}
                    id={g.idGame || g.id}
                    img={g.background_image}
                  />
                  )
                : <LoadingGames />
            : <h3>No se encontraron resultados</h3>}
        </div>
        <Pagination size={gamesView.length} />
      </section>
    </article>
  )
}

export default ListGames
