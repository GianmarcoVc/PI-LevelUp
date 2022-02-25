const path = require('path')
const { Router } = require("express")

const router = Router()

router.get(`/:name`, (req, res) => {
  const { name } = req.params
  res.sendFile(path.join(__dirname, `../images/${name}`))
})

module.exports = router