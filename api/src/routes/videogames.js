const axios = require('axios');
const { Op } = require("sequelize");
const { Router } = require("express")
const { Videogame, Genre } = require("../db")
const { YOUR_API_KEY } = process.env;

const router = Router()

router.get('/', async (req, res) => {
  const { name } = req.query

  try {

    // Peticion a la Base de Datos
    if(name){
          
      var gamesDB = await Videogame.findAll({
        where: { name: { [Op.startsWith] : name }},
        include: {
          model: Genre,
          attributes: ['name'],
          through: {attributes: []}
        }
      })  
    } else {
      var gamesDB = await Videogame.findAll({
        include: {
          model: Genre,
          attributes: ['name'],
          through: {attributes: []}
        }
      })  
    }

    // Peticion de Juegos a la Api
    let url_base = `http://api.rawg.io/api/games?key=${YOUR_API_KEY}`
    let url_api = name ? `${url_base}&search=${name}` : url_base
    
    let gamesApi = []
    let i = 0

    do {
      let result = await axios.get(url_api)
      let datesGames = result.data.results.map(r => {
        const {id, name, genres: allGenres, background_image, rating} = r
        const genres = allGenres.map(g => {
          const {id, name} = g
          return {id, name}
        })
        return {id, name, genres, background_image, rating}
      })
      gamesApi = gamesApi.concat(datesGames)
      url_api = result.data.next
      i++
    } while (!name && i < 5);
    
    // Se juntas ambos grupos en un mismo array
    let gamesAll = gamesDB.concat(gamesApi)

    // Se quitan los juegos demas para que tenga la cantidad pedida
    name ? gamesAll.splice(30) : gamesAll.splice(100)
    !name && gamesAll.splice(100)

    if(!gamesAll.length){return res.json(false)}
    return res.json(gamesAll)  
  } 
  catch (err) {
    console.log('Error: ', err)
    return res.json('Hubo un error')
  }
})

module.exports = router;