const path = require('path')
const multer = require('multer')
const { Router } = require("express")
const { Videogame, Genre } = require('../db')

const router = Router()

// Configuracion
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../images'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-Videogame-${file.originalname}`)
  }
})

const fileUpload = multer({storage})

// Ruta de Posteo del Juego
router.post('/', fileUpload.single('imageUpload'), async (req, res) => {
  
  const { 
    name, imageUrl, description, released, rating, genres, platforms, tags, website 
  } = req.body

  var strPlatforms = Array.isArray(platforms) ? platforms.join(', ') : platforms
  var strTags = Array.isArray(tags) ? tags.join(', ') : tags

  var urlImg = imageUrl || `${location.origin}/images/${req.file.filename}`

  const newGame = await Videogame.create({
    name, 
    background_image: urlImg,
    description_raw: description, 
    released, 
    rating, 
    platforms: strPlatforms,
    tags: strTags, 
    website
  })

  const add = async e => {
    let genre = await Genre.findOne({where: {name: e}})
    await newGame.addGenre(genre)
  }

  Array.isArray(genres) ? genres.forEach(g => add(g)) : add(genres)
  
  console.log('Game publish!')
})

module.exports = router