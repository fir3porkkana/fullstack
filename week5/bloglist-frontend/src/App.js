import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/blogForm"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInUser")
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => {
              setPassword(target.value)
            }}
          />
        </div>
        <button type="submit">tallenna</button>
      </form>
    </div>
  )

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const credentials = { username, password }
      const loggedInUser = await loginService.login(credentials)
      console.log(loggedInUser.token)
      window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
      blogService.setToken(loggedInUser.token)
      setUser(loggedInUser)
      setUsername("")
      setPassword("")
    } catch (exeption) {
      console.log(exeption)
      setMessage("wrong username or password")
      setTimeout(() => {
        setMessage(null)
      }, 3500)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user !== null && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => handleLogout(setUser)}>logout</button>
        </div>
      )}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <BlogForm setBlogs={setBlogs} setMessage={setMessage} />
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

const handleLogout = setUser => {
  window.localStorage.removeItem("loggedInUser")
  setUser(null)
}

export default App
