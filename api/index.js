const { PORT = 3001 } = process.env
const { conn } = require('./src/db.js')
const server = require('./src/app.js')

// Syncing all the models at once.
conn.sync({ force: true })
  .then(() => {
    server.listen(PORT, () => console.log(`Server listening at ${PORT}`))
  })
