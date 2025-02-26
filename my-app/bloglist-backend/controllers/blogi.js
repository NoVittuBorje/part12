const blogiRouter = require('express').Router()
const Blog = require('../models/blogi_model')
const userExtractor = require('../utils/userExtractor')
const tokenExtractor = require('../utils/tokenExtractor')




blogiRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogiRouter.post('/',tokenExtractor,userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  console.log(user)

  if ('title' in body && 'url' in body && body.title && body.author && body.url){
    const newblog = new Blog({
      title:body.title,
      author:body.author,
      url:body.url,
      user:user._id,
      likes: body.likes || 0
    })


    const savedBlog = await newblog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
  else{
    response.status(400).end()
  }
})
blogiRouter.put('/:id', async (request,response) => {
  const body = request.body

  const newblog = {
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes
  }

  const updatedblog = await Blog.findByIdAndUpdate(request.params.id, newblog, { new: true })
  response.status(201).json(updatedblog)
})

blogiRouter.delete('/:id',tokenExtractor,userExtractor, async (request,response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === user._id.toString()){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  else{response.status(401).end()}


})
module.exports = blogiRouter