const genres = require('./genres')
const images = require('./images')
const { Router } = require('express');
const videogame = require('./videogame')
const videogames = require('./videogames')
const createGame = require('./createGame')

const router = Router();

router.get('/', (req,res) => res.send('Estas en la api.'))
router.use('/images', images)
router.use('/genres', genres)
router.use('/videogame', videogame)
router.use('/videogame', createGame)
router.use('/videogames', videogames)

router.use((req, res) =>{
  res.status(404).send('ERROR 404: Ruta no encontrada.');
});

module.exports = router;