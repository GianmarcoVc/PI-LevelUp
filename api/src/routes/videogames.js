require('dotenv').config();
const axios = require('axios');
const { Op } = require("sequelize");
const { Router } = require("express")
const { YOUR_API_KEY } = process.env;
const { Videogame, Genre } = require("../db")

const router = Router()

router.get('/', async (req, res) => {
  const { name } = req.query

  const include = {
    model: Genre,
    attributes: ['name'],
    through: {attributes: []}
  }

  try {
    // Peticion a la Base de Datos
    const queryObj = name ? {
      where: { name: { [Op.substring] : name.toLowerCase() }}, include
    } : { include }

    let gamesDB = await Videogame.findAll(queryObj)  

    // Peticion de Juegos a la Api
    let url_base = `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`

    let url_api = !name 
      ? url_base
      : `${url_base}&search=${name}` 
    
    let gamesApi = []
    let i = 0

    do {
      let res = await axios.get(url_api)

      let games = res.data.results.map(game => {
        const {
          name, 
          rating,
          id: idGame, 
          background_image, 
          genres: allGenres,
        } = game

        const genres = allGenres.map(genre => {
          const {
            name,
            id: idGenre, 
          } = genre
          return {idGenre, name}
        })

        return {idGame, name, genres, background_image, rating}
      })

      gamesApi = gamesApi.concat(games)
      url_api = result.data.next
      i++
    // } while (!name && i < 5);
    } while (i < 5);
    
    let gamesAll = [gamesDB, gamesAll]

    name ? gamesAll.splice(30) : gamesAll.splice(100)

    if(!gamesAll.length){ return res.json(false) }
    return res.json(gamesAll)  
  } 
  catch (err) {
    console.log('Error: ', err)
    return res.json('Hubo un error')
  }
})

module.exports = router;