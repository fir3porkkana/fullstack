import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/blogForm"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"

const App = () => {
  const [blogs, setBlogs] = useState([])
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
        <Togglable buttonLabel={"log in"}>
          <LoginForm setUser={setUser} setMessage={setMessage} />
        </Togglable>
      ) : (
        <div>
          <Togglable buttonLabel={"add blog"}>
            <BlogForm setBlogs={setBlogs} setMessage={setMessage} />
          </Togglable>
          {blogs
            .sort((a, b) => a.likes - b.likes)
            .map(blog => (
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
