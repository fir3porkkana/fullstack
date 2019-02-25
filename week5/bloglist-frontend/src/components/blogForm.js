import React, { useState } from "react"
import blogService from "../services/blogs"
import { useField } from "../hooks/index"

const BlogForm = ({ setBlogs, setMessage }) => {
  const titleHook = useField("text")
  const authorHook = useField("text")
  const urlHook = useField("text")

  const handlePosting = async event => {
    try {
      event.preventDefault()
      await blogService.create({
        title: titleHook.value,
        author: authorHook.value,
        url: urlHook.value
      })
      const blogs = await blogService.getAll()
      console.log(blogs)
      titleHook.reset()
      authorHook.reset()
      urlHook.reset()
      setBlogs(blogs)
      setMessage(`blog ${titleHook.value} by ${authorHook.value} added`)
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
            title: <input {...titleHook} />
          </div>
          <div>
            author: <input {...authorHook} />
          </div>
          <div>
            url: <input {...urlHook} />
          </div>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
