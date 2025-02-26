const mongoose = require('mongoose')
require('express-async-errors')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')

const blogiRouter = require('./controllers/blogi')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')


mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

if (config.MONGODB_URI && !mongoose.connection.readyState) mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
console.log("juu")



app.use('/api/blogs', blogiRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {  
  const testingRouter = require('./controllers/testing')
  console.log("testing pääl")
  app.use('/api/testing', testingRouter)}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app