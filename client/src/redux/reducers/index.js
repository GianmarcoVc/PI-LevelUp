import { SET_PAGE, GET_GENRES, SET_HISTORY, GET_GAMES_ALL, SET_GAMES_VIEW, SET_GAMES_NOW, GET_GAMES_NAME, GET_GAME_DETAIL, SET_BAR_FILTER, SET_NEW_GAME } from '../actions'

const initialState = {
  page: 1,
  genres: [],
  history: [],
  gamesAll: [],
  gamesView: [],
  gamesName: [],
  gamesNow: 'all',
  gameDetail: {},
  newGame: false,
  barFilter: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PAGE:
      return { ...state, page: payload }

    case GET_GENRES:
      return { ...state, genres: payload }

    case SET_HISTORY:
      if (state.history.some(h => h === payload) > 0) {
        const r = state.history.splice(state.history.findIndex(e => e === payload), 1)[0]
        state.history.unshift(r)
        return state
      }
      return { ...state, history: [payload, ...state.history] }

    case GET_GAMES_ALL:
      return { ...state, gamesAll: payload, gamesView: payload }

    case GET_GAMES_NAME:
      return { ...state, gamesName: payload, gamesView: payload, gamesNow: 'name' }

    case SET_GAMES_VIEW:
      return { ...state, gamesView: payload }

    case SET_GAMES_NOW:
      return { ...state, gamesNow: payload }

    case GET_GAME_DETAIL:
      return { ...state, gameDetail: payload }

    case SET_BAR_FILTER:
      return { ...state, barFilter: !state.barFilter }

    case SET_NEW_GAME:
      return { ...state, newGame: payload }

    default:
      return { ...state }
  }
}
