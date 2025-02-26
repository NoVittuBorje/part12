const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user_model')


usersRouter.post('/', async (request,response) => {
  const { username, name, password } = request.body

  const salt_rounds = 10
  const passwordHash = await bcrypt.hash(password,salt_rounds)

  const user = new User({
    username,
    name,
    passwordHash
  })
  const saveUser = await user.save()
  response.status(201).json(saveUser)
})
usersRouter.get('/', async (request,response) => {
  const users = await User.find({}).populate('blogs',{ title: 1,author: 1,url: 1 })
  console.log(users)
  response.json(users)
})

module.exports = usersRouter