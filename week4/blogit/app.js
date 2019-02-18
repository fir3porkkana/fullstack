const config = require("./utils/config")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const blogsRouter = require("./controllers/blogs")
const mongoose = require("mongoose")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const middleware = require("./middleware")

console.log("connecting to ", config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch(error => {
    console.log("error in connecting to MongoDB: ", error.message)
  })

app.use(express.static("build"))
app.use(bodyParser.json()) /*
app.use(middleware)*/

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

module.exports = app
