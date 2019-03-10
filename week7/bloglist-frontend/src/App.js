import React, { useState, useEffect } from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import { Table } from "react-bootstrap"
import { useField } from "./hooks"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  )
}

const About = () => {
  return (
    <div>
      <p>
        tämä on tässä tehtynä vain navmenun takia, mallivastauksessa userien
        käsittely toimi vielä huonommin kuin userien käsittelyn kannalta
        rikkinäinen oma 4osan backendini (jonka vuoksi otin tämän pohjaksi).
        userien haku palvelimelta ei toimi, eikä blogeja voi siksi lisätä taikka
        likettää, sillä se on tässä mallissa estetty ilman sisäänkirjautunutta
        useria. täten, nyt on tehty radikaaleja ratkaisuja jotta tehtäviä on
        saatu tehtyä
      </p>
    </div>
  )
}

const SingleBlog = ({ blog }) => {
  return (
    <div>
      <h1>{blog.title}</h1>
      <br />
      <a href={`${blog.url}`}>blog link</a>
      <p>{blog.likes} likes</p>
      <p>added by [redacted]</p>
    </div>
  )
}

const App = () => {
  const [username] = useField("text")
  const [password] = useField("password")
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null
  })

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 10000)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      notify("wrong username of password", "error")
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.destroyToken()
    window.localStorage.removeItem("loggedBlogAppUser")
  }

  const createBlog = async blog => {
    const createdBlog = await blogService.create(blog)
    newBlogRef.current.toggleVisibility()
    setBlogs(blogs.concat(createdBlog))
    notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
  }

  // const likeBlog = async blog => {
  //   const likedBlog = { ...blog, likes: blog.likes + 1 }
  //   const updatedBlog = await blogService.update(likedBlog)
  //   setBlogs(blogs.map(b => (b.id === blog.id ? updatedBlog : b)))
  //   notify(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
  // }

  // const removeBlog = async blog => {
  //   const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
  //   if (ok) {
  //     const updatedBlog = await blogService.remove(blog)
  //     setBlogs(blogs.filter(b => b.id !== blog.id))
  //     notify(`blog ${updatedBlog.title} by ${updatedBlog.author} removed!`)
  //   }
  // }

  if (user !== null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input {...username} />
          </div>
          <div>
            salasana
            <input {...password} />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }

  const newBlogRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes
  const blogById = id => blogs.find(a => a.id === id)
  return (
    <div className="container">
      <h2>blogs</h2>

      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <Menu />
                <Table striped>
                  <tbody>
                    {blogs.sort(byLikes).map(blog => (
                      <tr key={blog.id}>
                        <td>
                          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          />
          <Route
            exact
            path="/about"
            render={() => (
              <div>
                <Menu />
                <About />
              </div>
            )}
          />
          <Route
            exact
            path="/blogs/:id"
            render={({ match }) => (
              <div>
                <Menu />
                <SingleBlog blog={blogById(match.params.id)} />
              </div>
            )}
          />
        </div>
      </Router>

      <Notification notification={notification} />

      <p>[redacted] logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel="create new" ref={newBlogRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
    </div>
  )
}

export default App
