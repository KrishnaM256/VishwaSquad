const express = require('express')
const dotenv = require('dotenv').config()
const connectDb = require('./connectDB/connectDB.js')
const app = express()
connectDb()
const port = process.env.PORT || 3001

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/authority', require('./routes/authorityRoutes'))
app.use('/api/disaster', require('./routes/disasterRoutes'))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
