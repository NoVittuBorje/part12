import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl,newObject,config)
  if (response.status === 400){
    return console.log(response)
  }
  return response.data
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = (id,newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}
const deleteblog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.delete(`${ baseUrl }/${id}`,config)
  return response
}

export default { getAll,create,update,setToken,deleteblog }