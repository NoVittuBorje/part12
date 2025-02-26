const jwt = require('jsonwebtoken')
const User = require('../models/user_model')

const userExtractor = async (request, response, next) => {
  if(request.token){
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      const user = await User.findById(decodedToken.id)
      request.user = user
      next()
    }catch(error){response.status(401).json({ error: 'Invalid token' })}}
  else{next()}}

module.exports = userExtractor