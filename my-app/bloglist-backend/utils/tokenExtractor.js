
const tokenExtractor = (request, response, next) => {
  try {
    let token = request.header('Authorization')
    token = token.replace('Bearer ', '')
    request.token = token
    next()
  }catch(error){response.status(401).json({ error: 'Invalid token' })}

}


module.exports = tokenExtractor