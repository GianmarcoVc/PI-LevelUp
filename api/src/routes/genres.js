require('dotenv').config()
const axios = require('axios')
const { Genre } = require('../db')
const { YOUR_API_KEY } = process.env
const { Router } = require('express')

const router = Router()

router.get('/', async (req, res) => {
  const response = await axios.get(`/genres?key=${YOUR_API_KEY}`)
  const results = response.data.results
  results.forEach(g => Genre.create({ name: g.name }))
  return res.send(results.map(e => e.name))
})

module.exports = router
