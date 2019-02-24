import React, { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog }) => {
  const [showing, setShowing] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }
  console.log("adder: ", blog.user)
  return (
    <div style={blogStyle}>
      <div onClick={() => setShowing(!showing)}>
        "{blog.title}" by {blog.author}
        {showing === true && (
          <div>
            <ul>
              <li>{blog.url}</li>
              <li>
                {blog.likes} likes <button>like</button>
              </li>
            </ul>
            <button
              onClick={() => {
                if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
                  blogService.remove(blog.id)
                }
              }}
            >
              delet
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
