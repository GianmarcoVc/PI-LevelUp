require('dotenv').config()
const axios = require('axios')
const { Op } = require('sequelize')
const { Router } = require('express')
const { YOUR_API_KEY } = process.env
const { Videogame, Genre } = require('../db')

const router = Router()

router.get('/', async (req, res) => {
  const { name } = req.query

  const include = {
    model: Genre,
    attributes: ['name'],
    through: { attributes: [] }
  }
  const queryObj = name
    ? {
        where: {
          name: {
            [Op.or]: {
              [Op.substring]: name,
              [Op.startsWith]: name,
              [Op.endsWith]: name
            }
          }
        },
        include
      }
    : { include }

  const urlBase = `/games?key=${YOUR_API_KEY}`

  try {
    // Peticion a la Base de Datos
    const GamesDB = await Videogame.findAll(queryObj)

    // Peticion de Juegos a la Api
    let GamesAPI = []
    let urlApi = !name ? urlBase : `${urlBase}&search=${name}`

    // Para que nos devuelva 100 juegos se realizara 5 veces el proceso (aumentando 20 por cada uno)
    for (let i = 0; i < 5; i++) {
      const res = await axios.get(urlApi)

      const NewGames = res.data.results
        ? res.data.results.map(game => {
            const {
              name, rating, id: idGame, background_image, genres: allGenres
            } = game
            const genres = allGenres.map(genre => genre.name)
            return { name, rating, idGame, background_image, genres }
          })
        : []

      GamesAPI = [...GamesAPI, ...NewGames]
      urlApi = res.data.next
    }

    const gamesAll = [...GamesDB, ...GamesAPI]

    if (!gamesAll.length) { return res.json(false) }
    return res.json(gamesAll)
  } catch (err) {
    console.log('Error: ', err)
    return res.json([])
  }
})

module.exports = router
