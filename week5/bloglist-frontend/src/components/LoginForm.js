import React from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { useField } from "../hooks/index"

const LoginForm = ({ setUser, setMessage }) => {
  const usernameHook = useField("text")
  const passwordHook = useField("password")

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const username = usernameHook.value
      const password = passwordHook.value
      const credentials = { username, password }
      console.log("credentials:", credentials)
      const loggedInUser = await loginService.login(credentials)
      console.log(loggedInUser.token)
      window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
      blogService.setToken(loggedInUser.token)
      setUser(loggedInUser)
      usernameHook.reset()
      passwordHook.reset()
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
          <input {...usernameHook} />
        </div>
        <div>
          salasana
          <input {...passwordHook} />
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  )
}

export default LoginForm
