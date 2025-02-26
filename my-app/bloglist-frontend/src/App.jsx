import { useState, useEffect ,useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import './styles.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()
  const blogref = useRef()

  const [errorMessage, setErrorMessage] = useState(null)
  const [Message, setMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs( blogs )
    }

    )
  }, [])

  const loginForm = () => (
    <div>
      <h2>Log in to app</h2>
      <form onSubmit={handleLogin}>
        <div>
      username
          <input
            type="text"
            value={username}
            name="Username"
            data-testid='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
      password
          <input
            type="password"
            value={password}
            name="Password"
            data-testid='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception.message)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const LikeBlog= (props) => {
    
    props.blog.likes = props.blog.likes + 1
    blogService.update(props.blog.id,props.blog).then(returnedblog => {
      blogService.getAll().then(blogs => {
        blogs.sort((a,b) => b.likes - a.likes)
        setBlogs( blogs )})
      }).catch(error => console.log(error))
      
  }
  const addBlog = (BlogObject) => {
    blogService.create(BlogObject).then(blog => {
      blogService.getAll().then(blogs => {
        blogs.sort((a,b) => b.likes - a.likes)
        setBlogs( blogs )})
      setMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }).catch(exception => {
      console.log(exception.message)
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)})
    blogFormRef.current.toggleVisibility()
  }

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  if (user === null) {
    return (
      <div>
        <Notification message={Message} />
        <ErrorNotification message={errorMessage} />
        <div>
          {loginForm()}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={Message} />
      <ErrorNotification message={errorMessage} />
      <div>
        <p>{user.name} logged in <button onClick={logOut}>logout</button></p>

        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <BlogForm addBlog={addBlog}/>
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id}  blog={blog} ref={blogref} LikeBlog={LikeBlog} buttonLabel="view" user={user} />)}
      </div>
    </div>
  )


}

export default App