require('dotenv').config()
const axios = require('axios')
const { Genre } = require('../db')
const { YOUR_API_KEY } = process.env
const { Router } = require('express')

const router = Router()

router.get('/', async (req, res) => {
  const numGenresInDB = await Genre.count()
  let dataGenres
  if (numGenresInDB) {
    const genres = await Genre.findAll()
    dataGenres = genres
  } else {
    const response = await axios.get(`/genres?key=${YOUR_API_KEY}`)
    const results = response.data.results
    results.forEach(g => Genre.create({ name: g.name }))
    dataGenres = results
  }
  return res.send(dataGenres.map(e => e.name))
})

module.exports = router
