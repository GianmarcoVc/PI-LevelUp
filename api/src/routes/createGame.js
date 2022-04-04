const router = require('express').Router()
const { Videogame, Genre } = require('../db')

router.post('/', async (req, res) => {
  const {
    name, imageUrl, description, released, rating, genres, platforms, tags, website
  } = req.body

  // Pasar a arreglo si se emvia un strings para poder mapear solo los nombres
  const validateArray = (element) => !Array.isArray(element) ? [element] : element
  const ArrPlatforms = validateArray(platforms)
  const ArrTags = validateArray(tags)

  try {
    const newGame = await Videogame.create({
      name,
      background_image: imageUrl,
      description_raw: description,
      released,
      rating,
      platforms: ArrPlatforms,
      tags: ArrTags,
      website
    })
    genres.forEach(async g => {
      const genre = await Genre.findAll({ where: { name: g } })
      newGame.addGenre(genre)
    })
    console.log('Juego publicado con éxito!')
    return res.json(newGame)
  } catch (err) {
    console.log('Error: ', err)
    return res.json('Hubo un error al tratar de crear el juego: ', err)
  }
})

module.exports = router
