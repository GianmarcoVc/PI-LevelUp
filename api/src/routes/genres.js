const axios = require("axios")
const { Genre } = require('../db')
const { YOUR_API_KEY } = process.env
const { Router } = require("express")

const router = Router()

router.get('/', async (req, res) => {

  let genres = await axios.get(`http://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
  
  genres.data.results.forEach(g => Genre.create({ name: g.name }))
  
  return res.send(genres.data.results.map(e => e.name))
})

module.exports = router