const express = require('express')
const dotenv = require('dotenv').config()
const connectDb = require('./connectDB/connectDB.js')
const cookieParser = require('cookie-parser')

const app = express()
process.on('uncaughtException', (err) => {
  console.log(`Error:${err}`)
  console.log(`Shutting down server due to Uncaught Exception`)
  process.exit(1)
})

connectDb()

const port = process.env.PORT || 3001

app.use(express.json())
app.use(cookieParser())

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/authority', require('./routes/authorityRoutes'))
app.use('/api/disaster', require('./routes/disasterRoutes'))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
process.on('unhandledRejection', (err) => {
  console.log(`Error:${err}`)
  console.log(`Shutting down the server due to Unhandled Rejection`)
  server.close(() => {
    process.exit(1)
  })
})
