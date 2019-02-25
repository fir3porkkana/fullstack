const blogs = [
  {
    _id: "5c6fe7cae6389a4dcabe9b43",
    title: "äitis on jonne",
    author: "mutsis lol",
    url: "http://sieni.es",
    user: "5c6b20cf128d0502e1941a35",
    __v: 0
  },
  {
    _id: "5c6ad79256db9a5db2223f3f",
    title: "toimiiko tää nyt lainkaan",
    author: "joku pässi",
    url: "sieni.es",
    likes: 3,
    user: "5c6acd36837c0654fe6267f3",
    __v: 0
  }
]

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }
