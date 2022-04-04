const axios = require('axios')
const { Router } = require('express')
const genres = require('./genres')
const videogame = require('./videogame')
const createGame = require('./createGame')
const videogames = require('./videogames')

axios.default.defaults.baseURL = 'https://api.rawg.io/api'

const router = Router()

router.get('/', (req, res) => res.send('Welcome to Api for PI-Videogames.'))
router.use('/genres', genres)
router.use('/videogame', videogame)
router.use('/videogame', createGame)
router.use('/videogames', videogames)

router.use((req, res) => {
  res.status(404).send('ERROR 404: Ruta no encontrada.')
})

module.exports = router
