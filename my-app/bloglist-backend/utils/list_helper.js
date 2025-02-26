var _ = require('lodash')
const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  let likes = 0
  blogs.map(blog => {
    likes += blog.likes
  })
  return likes
}
const favouriteblog = (blogs) => {
  let mostlikes = 0
  let favblog = []
  blogs.map(blog => {
    if (blog.likes > mostlikes){
      mostlikes = blog.likes
      favblog = blog
    }
  })
  return favblog
}
const mostblogs = (blogs) => {
  let most = _.chain(blogs)
    .groupBy('author')
    .toPairs()
    .sortBy(1)
    .map(function (pair) {
      return [pair[0], pair[1].length]
    })
    .value()
  var mostblog = 0
  var result = []
  most.map(blogger => {
    if (blogger[1] > mostblog){
      mostblog = blogger[1]
      result = blogger
    }
  })
  return result
}
module.exports = {
  dummy,
  totalLikes,
  favouriteblog,
  mostblogs
}