const testingRouter = require('express').Router()
const Blog = require('../models/blogi_model')
const User = require('../models/user_model')

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter