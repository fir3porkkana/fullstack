import React, { useState } from "react"
import blogService from "../services/blogs"

const BlogForm = ({ setBlogs, setMessage }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handlePosting = async event => {
    try {
      event.preventDefault()
      await blogService.create({ title, author, url })
      const blogs = await blogService.getAll()
      console.log(blogs)
      setTitle("")
      setAuthor("")
      setUrl("")
      setBlogs(blogs)
      setMessage(`blog ${title} by ${author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 3500)
    } catch (exception) {
      console.log(exception)
      setMessage(exception)
      setTimeout(() => {
        setMessage(exception)
      }, 3500)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handlePosting}>
        <div>
          <div>
            title:{" "}
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:{" "}
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:{" "}
            <input
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
