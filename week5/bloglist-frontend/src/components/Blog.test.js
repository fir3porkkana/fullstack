import React from "react"
import { render, fireEvent } from "react-testing-library"
import Blog from "./Blog"

describe("<Blog/>", () => {
  const blog = {
    title: "näin sitä pyörää ajetaan",
    author: "tietäjä-tiera",
    likes: 3000
  }

  let component

  beforeEach(() => {
    component = render(<Blog blog={blog} />)
  })

  it("at first only the title and auhtor are displayed", () => {
    expect(component.container).toHaveTextContent(
      "näin sitä pyörää ajetaan by tietäjä-tiera"
    )
    expect(component.container).not.toHaveTextContent("3000 likes")
  })

  it("after clicking the element additional info is rendered", () => {
    const clickableBlog = component.getByText(
      "näin sitä pyörää ajetaan by tietäjä-tiera"
    )
    fireEvent.click(clickableBlog)

    expect(component.container).toHaveTextContent(
      "näin sitä pyörää ajetaan by tietäjä-tiera"
    )
    expect(component.container).toHaveTextContent("3000 likes")
  })
})
