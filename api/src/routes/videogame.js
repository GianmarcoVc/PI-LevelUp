require('dotenv').config();
const axios = require('axios')
const { YOUR_API_KEY } = process.env;
const { Router } = require("express")
const { Videogame, Genre } = require("../db")

const router = Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    if(id.includes('-')){
      var game = await Videogame.findOne({
        where: {id},
        include: {
          model: Genre,
          attributes: ['name'],
          through: {attributes: []}
        }
      })    
    }
    else {
      let result = await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`)
      const { name, description_raw, background_image, released, rating, platforms, tags, genres, website } = result.data  
      
      let result2 = await axios.get(`https://api.rawg.io/api/games/${id}/movies?key=${YOUR_API_KEY}`)
      if(result2.data.results.length){
        var { name: v_name, preview: v_preview, data: v_data} = result2.data.results[0]
      }

      let result3 = await axios.get(`https://api.rawg.io/api/games/${id}/screenshots?key=${YOUR_API_KEY}`)
      const screenshots = result3.data.results && result3.data.results.map(a => a.image)

      var game = {name, description_raw, background_image, released, rating, 
                  platforms: platforms.map(p => p.platform.name), tags: tags.map(t => t.name), genres: genres.map(g => g.name), 
                  website, v_name, v_preview, v_data, screenshots}
    }    
    if(Object.values(game).every(e => !e)){return}
    return res.json(game)
  } 
  catch (err) {
    console.log('Error: ', err)
    return res.json({error: 'No se encontró ningún juego.'})
  }
})

module.exports = router