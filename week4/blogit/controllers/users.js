const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.post("/", async (request, response, next) => {
  const body = request.body
  console.log(body.username, body.password)
  if (
    body.username === undefined ||
    body.username.length < 3 ||
    body.password === undefined ||
    body.password.length < 3
  ) {
    return response.status(400).json({ error: "invalid username or password" })
  }

  try {
    const saltRouds = 10
    console.log("IDENTIFIOIVA TEKSTI XD", body.password)
    const passwordHash = await bcrypt.hash(body.password, saltRouds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      author: 1,
      url: 1,
      id: 1
    })

    response.json(users.map(u => u.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
