const Blog = require("../models/blog")
const User = require("../models/user")

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const summafunktio = (totaali, blog) => totaali + blog.likes

  return blogs.length === 0 ? 0 : blogs.reduce(summafunktio, 0)
}

const favouriteBlog = blogs => {
  if (blogs.length === 0) {
    return null
  }
  let palautettava = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > palautettava.likes) {
      palautettava = blog
    }
  })

  return palautettava
}

const blogsInDb = async () => {
  console.log("oin")
  const blogs = await Blog.find({})
  console.log("ouin")
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  blogsInDb,
  usersInDb
}
