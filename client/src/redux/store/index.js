import thunk from 'redux-thunk'
import gameReducer from '../reducers'
import { createStore, applyMiddleware, compose } from 'redux'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  gameReducer,
  composeEnhancer(applyMiddleware(thunk))
)

export default store
