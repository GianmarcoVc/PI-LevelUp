import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { validate } from '../containers/CreateGame/Validate'
import { createGame, getGenres, setNewGame } from '../redux/actions'

const useCreateGame = () => {
  const dispatch = useDispatch()
  const { genres } = useSelector(state => state)
  const tags = ['Singleplayer', 'Multiplayer', 'RPG', 'Co-op', 'Funny']
  const platforms = ['PlayStation 5', 'PC', 'Xbox One', 'PlayStation 3', 'Nintendo Switch']

  const initialState = {
    name: '',
    image: '',
    description: '',
    released: '',
    rating: '',
    genres: [],
    platforms: [],
    tags: []
  }
  const [send, setSend] = useState(false)
  const [game, setGame] = useState(initialState)
  const [error, setError] = useState(initialState)
  const [errorImage, setErrorImage] = useState(false)
  const [dataSend, setDataSend] = useState({ id: '', send: false, error: false })

  useEffect(() => dispatch(getGenres()), [])

  useEffect(() => {
    send && !dataSend.send && setError(validate(game))
  }, [send, game])

  const handleInputChange = e => {
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
    if (name === 'image') { setErrorImage(false) }
    setGame({ ...game, [name]: value })
  }

  const handleInputSubmit = e => {
    e.preventDefault()
    setSend(true)

    const result = validate(game)
    setError(result)

    if (Object.values(result || error).every(e => !e.length)) {
      setDataSend({ send: true })
      dispatch(createGame(game))
        .then(newGame => {
          setDataSend({ send: true, id: newGame.data.id })
          dispatch(setNewGame(true))
          setError(initialState)
          setGame(initialState)
          e.target.reset()
        })
        .catch(() => {
          setDataSend({ send: true, error: true })
        })
        .finally(() => {
          setSend(false)
        })
    }
  }

  return {
    game,
    setGame,
    error,
    tags,
    genres,
    platforms,
    send,
    dataSend,
    setDataSend,
    errorImage,
    setErrorImage,
    handleInputSubmit,
    handleInputChange
  }
}

export default useCreateGame
