const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("../utils/list_helper")
const User = require("../models/user")

const api = supertest(app)

test("blogs are returned as JSON", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-type", /application\/json/)
})

test("the identifier of a blog is called 'id'", async () => {
  const blogs = await helper.blogsInDb()
  const id = blogs[0].id
  console.log(id)
  expect(id).toBeDefined()
})

describe("when there is initially one user at db", async () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({
      username: "teppo",
      name: "teppo tulppa",
      password: "saleinen"
    })
    await user.save()
  })

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen"
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    console.log(usersAtEnd[0])
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test("creation doesn't go through with invalid username or password", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: ":D",
      name: "kovis ukkeli",
      password: "sasses"
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtStart.length).toBe(usersAtEnd.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
