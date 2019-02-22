import React from "react"
const Blog = ({ blog }) => (
  <div>
    <p>
      Title: {blog.title} Author: {blog.author}
    </p>
  </div>
)

export default Blog
