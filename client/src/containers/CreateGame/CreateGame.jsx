import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaCheck, FaTimes, FaImage } from 'react-icons/fa'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import styles from './CreateGame.module.scss'
import { validate } from './Validate.jsx'
import { CreateCharacter } from '../../assets'
import { createGame, getGenres, setNewGame } from '../../redux/actions'
import { CampoForm, CampoFormOpts, ModalSelectOpts, ModalImage, SpinnerLoading } from '../../components'

const CreateGame = () => {
  const dispatch = useDispatch()
  const genres = useSelector(state => state.genres)
  const tags = ['Singleplayer', 'Multiplayer', 'RPG', 'Co-op', 'Funny']
  const platforms = ['PlayStation 5', 'PC', 'Xbox One', 'PlayStation 3']

  const initialState = {
    name: '',
    imageUrl: '',
    description: '',
    released: '',
    rating: '',
    genres: [],
    platforms: [],
    tags: []
  }
  const [game, setGame] = useState(initialState)
  const [error, setError] = useState(initialState)

  const [send, setSend] = useState(false)
  const [select, setSelect] = useState(null)
  const [openImage, setOpenImage] = useState(false)
  const [sendFirst, setSendFirst] = useState(false)
  const [errorImage, setErrorImage] = useState(false)
  const [dataSend, setDataSend] = useState({ id: '', send: false, error: false })

  useEffect(() => {
    !genres.length && dispatch(getGenres())
    sendFirst && setError(validate(game))
  }, [dispatch, sendFirst, game, genres])

  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    const checked = e.target.checked

    if (['genres', 'platforms', 'tags'].includes(name)) {
      return (checked && !game[name].includes(value))
        ? setGame({ ...game, [name]: [...game[name], value] })
        : setGame({ ...game, [name]: game[name].filter(v => v !== value) })
    }
    if (name === 'rating') {
      return setGame({ ...game, [name]: +value })
    }
    if (name === 'imageUrl') { setErrorImage(false) }
    setGame({ ...game, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    let result
    if (!sendFirst) {
      setSendFirst(true)
      const validation = validate(game)
      setError(validation)
      result = validation
    }

    if (Object.values(result || error).every(e => !e.length)) {
      setSend(true)
      dispatch(createGame(game))
        .then(newGame => {
          setDataSend({ ...dataSend, send: true, id: newGame.data.id })
          dispatch(setNewGame(true))
          setSend(false)
          setSendFirst(false)
          setGame(initialState)
          e.target.reset()
        })
        .catch(() => {
          setSend(false)
          setDataSend({ ...dataSend, send: true, error: true })
        })
    }
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Level Up | Create</title>
        </Helmet>
      </HelmetProvider>
      <div id={styles.create}>
        {(send || dataSend.send) &&
          <section id={styles.modalSend}>
            <div id={styles.content}>
              {send &&
                <div id={styles.loadingSend}>
                  <SpinnerLoading />
                </div>}
              {dataSend.error
                ? <FaTimes className={`${styles.iconModal} ${styles.error}`} />
                : <FaCheck className={`${styles.iconModal} ${styles.check}`} />}

              {dataSend.error
                ? <p id={styles.textModal}>Hubo un error al crear el juego <span>Vuelva a intentarlo luego</span></p>
                : <p id={styles.textModal}>El juego fue creado con éxito</p>}

              <div id={styles.btnsModal}>
                <Link
                  className={`${styles.btn} ${dataSend.error && styles.error}`}
                  to={dataSend.error ? '/games' : `/game/${dataSend.id}`}
                >
                  Ir a{dataSend.error ? ' Games' : 'l Juego'}
                </Link>
                {!dataSend.error &&
                  <a
                    href='#again'
                    className={styles.btn}
                    onClick={() => setDataSend({ id: '', send: false })}
                  >Crear otro
                  </a>}
              </div>
            </div>
          </section>}
        {(game.imageUrl && !errorImage && openImage) &&
          <ModalImage
            srcImage={game.imageUrl}
            moveCarrusel={setOpenImage}
            iconsMove={false}
          />}
        <form
          id={styles.form}
          onChange={e => handleChange(e)}
          onSubmit={e => handleSubmit(e)}
        >
          <h2 id={styles.title}>{game.name || 'Nombre del Juego'}</h2>

          <CampoForm
            name='Nombre'
            slug='name'
            type='text'
            error={error.name}
          />
          <CampoForm slug='image' error={error.image}>
            <label className={styles.require}>Foto del Juego</label>
            <section id={styles.boxImage}>
              <div id={styles.infoImageUrl}>
                {(!errorImage && game.imageUrl) &&
                  <img
                    id={styles.image}
                    src={game.imageUrl}
                    onClick={() => setOpenImage(true)}
                    onError={() => setErrorImage(true)}
                  />}

                {errorImage
                  ? <FaTimes size={20} />
                  : <FaImage size={30} />}
                <p>
                  {errorImage
                    ? 'No se puede cargar la imagen'
                    : 'Ingresa la url debajo'}
                </p>
              </div>
              <input
                type='url'
                id={styles.imageUrl}
                name='imageUrl'
                disabled={game.imageUpload}
                placeholder='Ingresa la Url de tu imagen'
              />
            </section>
          </CampoForm>
          <CampoForm
            slug='description'
            error={error.description}
          >
            <label
              htmlFor='description'
              className={styles.require}
            >
              Descripcion
            </label>
            <textarea
              name='description'
              id={styles.inputDescription}
            />
          </CampoForm>
          <CampoForm
            slug='released'
            type='date'
            name='Lanzamiento'
            error={error.released}
          />
          <CampoForm
            slug='rating'
            type='number'
            name='Rating'
            error={error.rating}
          />
          <CampoFormOpts
            name='Géneros'
            type='genres'
            error={error.genres}
            game={game}
            setGame={setGame}
            setSelect={setSelect}
          />
          <CampoFormOpts
            name='Plataformas'
            type='platforms'
            error={error.platforms}
            game={game}
            setGame={setGame}
            setSelect={setSelect}
          />
          <CampoFormOpts
            name='Etiquetas'
            type='tags'
            error={error.platforms}
            game={game}
            setGame={setGame}
            setSelect={setSelect}
          />
          <CampoForm
            slug='website'
            type='text'
            name='Sitio Web'
            error={false}
          />
          <input
            id={styles.btnSub}
            type='submit'
            value='Publicar Juego!'
            disabled={sendFirst && Object.values(error).some(e => e.length)}
          />
          <ModalSelectOpts
            game={game}
            select={select}
            setSelect={setSelect}
            listOpts={select === 'genres' ? genres : select === 'tags' ? tags : platforms}
          />
        </form>
        <img
          id={styles.character}
          src={CreateCharacter}
          alt='Personaje de Valorant'
        />
      </div>
    </>
  )
}

export default CreateGame
