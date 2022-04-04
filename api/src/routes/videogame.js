require('dotenv').config()
const axios = require('axios')
const { YOUR_API_KEY } = process.env
const { Router } = require('express')
const { Videogame, Genre } = require('../db')

const router = Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    if (id.includes('-')) {
      const game = await Videogame.findOne({
        where: { id },
        include: {
          model: Genre,
          attributes: ['name'],
          through: { attributes: [] }
        }
      })
      return res.json(game)
    }

    // Peticion del Juego
    const gameFind = await axios.get(`games/${id}?key=${YOUR_API_KEY}`)
    const { name, description_raw, background_image, released, rating, platforms, tags, genres, website } = gameFind.data

    // Peticion de los Trailers
    const movies = await axios.get(`games/${id}/movies?key=${YOUR_API_KEY}`)
    const { name: videoName, preview: videoPreview, data: videoData } = movies.data?.results[0] || {}

    // Peticion de los Screenshots
    const screens = await axios.get(`games/${id}/screenshots?key=${YOUR_API_KEY}`)
    const screenshots = screens.data?.results?.map(a => a.image)

    const game = {
      name,
      description_raw,
      background_image,
      released,
      rating,
      platforms: platforms.map(p => p.platform.name),
      tags: tags.map(t => t.name),
      genres: genres.map(g => g.name),
      website,
      videoName,
      videoPreview,
      videoData,
      screenshots
    }
    return res.json(game)
  } catch (err) {
    console.log('Error: ', err)
    return res.json({ error: 'No se encontró ningún juego.' })
  }
})

module.exports = router
