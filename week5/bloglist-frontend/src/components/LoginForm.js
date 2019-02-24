import React, { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"

const LoginForm = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

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
}

export default LoginForm
