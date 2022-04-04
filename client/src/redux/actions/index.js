import axios from 'axios'
export const SET_PAGE = 'SET_PAGE'
export const GET_GENRES = 'GET_GENRES'
export const SET_HISTORY = 'SET_HISTORY'
export const SET_GAMES_NOW = 'SET_GAMES_NOW'
export const GET_GAMES_ALL = 'GET_GAMES_ALL'
export const SET_GAMES_VIEW = 'SET_GAMES_VIEW'
export const GET_GAMES_NAME = 'GET_GAMES_NAME'
export const GET_GAME_DETAIL = 'GET_GAME_DETAIL'
export const SET_BAR_FILTER = 'SET_BAR_FILTER'
export const SET_NEW_GAME = 'SET_NEW_GAME'

// axios.defaults.baseURL = import.meta.env.PROD
axios.defaults.baseURL = import.meta.env.PROD
  ? 'https://server-videogames.herokuapp.com'
  : 'http://localhost:3001'

export const setPage = number => {
  return { type: SET_PAGE, payload: number }
}

export const getGenres = () => {
  return async dispatch => {
    const res = await axios.get('/genres')
    return dispatch({ type: GET_GENRES, payload: res.data })
  }
}

export const setHistory = value => {
  return { type: SET_HISTORY, payload: value }
}

export const getGamesAll = () => {
  return async dispatch => {
    const res = await axios.get('/videogames')
    return dispatch({ type: GET_GAMES_ALL, payload: res.data })
  }
}

export const getGamesName = name => {
  return async dispatch => {
    const res = await axios.get(`/videogames?name=${name}`)
    return dispatch({ type: GET_GAMES_NAME, payload: res.data })
  }
}

export const setGamesView = payload => {
  return { type: SET_GAMES_VIEW, payload }
}

export const setGamesNow = payload => {
  return { type: SET_GAMES_NOW, payload }
}

export const getGameDetail = id => {
  if (!id) { return { type: GET_GAME_DETAIL, payload: '' } }
  return async dispatch => {
    const res = await axios.get(`/videogame/${id}`)
    return dispatch({ type: GET_GAME_DETAIL, payload: res.data })
  }
}

export const setBarFilter = () => {
  return { type: SET_BAR_FILTER }
}

export const createGame = (game) => () => axios.post('/videogame', game)

export const setNewGame = payload => {
  return { type: SET_NEW_GAME, payload }
}
