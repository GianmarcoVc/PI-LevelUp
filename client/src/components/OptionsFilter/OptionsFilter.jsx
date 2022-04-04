import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'

import styles from './OptionsFilter.module.scss'
import { Dropdown } from '../../components'
import { getGenres, setGamesView } from '../../redux/actions'

const InputGroup = ({ name, value, disabled = false, isGenre }) => (
  <div className={styles.input_group}>
    <input
      value={value}
      type='checkbox'
      disabled={disabled}
      className={isGenre ? 'check_genre' : ''}
    />
    <label htmlFor={value}>{name || value}</label>
  </div>
)

const OptionsFilter = () => {
  const dispatch = useDispatch()
  const { gamesAll, gamesName, gamesNow, genres, barFilter } = useSelector(state => state)

  useEffect(() => {
    !genres.length && dispatch(getGenres())
  }, [dispatch, genres])

  // Dropdown de cada uno
  const [drop, setDrop] = useState({
    genres: false,
    order: false,
    creator: false
  })

  // Cuales estan checkeados
  const [check, setCheck] = useState({
    genreFilter: [],
    asc_title: false,
    desc_title: false,
    asc_rating: false,
    desc_rating: false,
    gamesAPI: false,
    gamesDB: false
  })

  const handleChange = e => {
    const checked = e.target.checked
    const value = e.target.defaultValue
    const className = e.target.className

    const setGames = games => { dispatch(setGamesView(games)) }
    const copyGames = gamesNow === 'all' ? gamesAll : gamesName

    // Géneros
    if (className === 'check_genre') {
      const filterGenres = checked
        ? [...check.genreFilter, value]
        : [...check.genreFilter].filter(e => e !== value)

      setCheck({ ...check, genreFilter: filterGenres })

      if (!filterGenres.length) { return setGames(copyGames) }
      const gamesFilter = copyGames.filter(a => a.genres.some(g => filterGenres.includes(g.name || g)))
      if (!gamesFilter.length) { return setGames(false) }
      return setGames(gamesFilter)
    }

    console.log('se setea: ', value)
    setCheck({ ...check, [value]: !!checked })

    // Orden Rating
    if (['asc_rating', 'desc_rating'].includes(value)) {
      const orderRat = [...copyGames].sort((a, b) => a.rating - b.rating)
      checked ? setGames(value === 'asc_rating' ? orderRat : orderRat.reverse()) : setGames(copyGames)
    }

    // Orden Alfabeticamente
    if (['asc_title', 'desc_title'].includes(value)) {
      const orderAlf = [...copyGames].sort((a, b) => a.name > b.name ? 1 : -1)
      checked ? setGames(value === 'asc_title' ? orderAlf : orderAlf.reverse()) : setGames(copyGames)
    }

    // Creador
    if (value.includes('game')) {
      const filterGames = boolean => {
        const games = copyGames.filter(g => !!Number(g.idGame || g.id) === boolean)
        return games.length ? games : false
      }
      if (
        (checked && ((value === 'gamesDB' && check.gamesAPI) || (value === 'gamesAPI' && check.gamesDB))) ||
        (!checked && ((value === 'gamesDB' && !check.gamesAPI) || (value === 'gamesAPI' && !check.gamesDB)))
      ) { return setGames(copyGames) }
      const isGamesAPI = value === 'gamesAPI'
      if (checked) { setGames(filterGames((isGamesAPI))) } else { setGames(filterGames((!isGamesAPI))) }
    }
  }

  return (
    <motion.div
      id={styles.boxForm}
      initial={ window.innerWidth < 768
        ? { x: '100%' }
        : { width: '0px' }}
      animate={window.innerWidth < 768
        ? { x: barFilter ? '0' : '100%' }
        : { width: barFilter ? 'max-content' : '0px' }}
    >
      <form
        id={styles.formFilter}
        onChange={e => handleChange(e)}
      >
        <Dropdown
          drop={drop}
          select='genres'
          title='Géneros'
          setDrop={setDrop}
        >
          {genres.map((genre, i) => <InputGroup key={i} value={genre} isGenre />)}
        </Dropdown>
        <Dropdown
          drop={drop}
          select='order'
          title='Orden'
          setDrop={setDrop}
        >
          <InputGroup
            name='Alfabéticamente (A-Z)'
            value='asc_title'
            disabled={check.desc_title || check.asc_rating || check.desc_rating}
          />
          <InputGroup
            name='Alfabéticamente (Z-A)'
            value='desc_title'
            disabled={check.asc_title || check.asc_rating || check.desc_rating}
          />
          <InputGroup
            name='Rating (Menor-Mayor)'
            value='asc_rating'
            disabled={check.asc_title || check.desc_title || check.desc_rating}
          />
          <InputGroup
            name='Rating (Mayor-Menor)'
            value='desc_rating'
            disabled={check.asc_title || check.desc_title || check.asc_rating}
          />
        </Dropdown>
        <Dropdown
          drop={drop}
          select='creator'
          title='Creador'
          setDrop={setDrop}
        >
          <InputGroup
            name='Alone of Me'
            value='gamesDB'
          />
          <InputGroup
            name='Games of Api'
            value='gamesAPI'
          />
        </Dropdown>
      </form>
    </motion.div>
  )
}

export default OptionsFilter
