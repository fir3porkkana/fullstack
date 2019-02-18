const listHelper = require("../utils/list_helper")

describe("most likes", () => {
  const listWithNoBlogs = []

  const listWithOneBlog = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    }
  ]

  const listWithTwoBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    }
  ]

  test("when a list has two blogs the one with more likes is returned", () => {
    const result = listHelper.favouriteBlog(listWithTwoBlogs)
    expect(result).toEqual({
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    })
  })

  test("when a list only has one blog return that one", () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test("when a list is empty, return null", () => {
    const result = listHelper.favouriteBlog(listWithNoBlogs)
    expect(result).toBe(null)
  })
})
