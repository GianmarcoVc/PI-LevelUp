const { Router } = require('express');
const genres = require('./genres')
const images = require('./images')
const videogame = require('./videogame')
const videogames = require('./videogames')
const createGame = require('./createGame')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req,res) => res.send('Estas en la api.'))
router.use('/images', images)
router.use('/genres', genres)
router.use('/videogame', videogame)
router.use('/videogame', createGame)
router.use('/videogames', videogames)

// Peticion a cualquier otra ruta.
router.use((req, res) =>{
  res.status(404).send('ERROR 404: Ruta no encontrada.');
});

module.exports = router;