require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGO_URI
let TOKEN = process.env.TEST_TOKEN
module.exports = {
  MONGODB_URI,
  PORT,
  TOKEN
}