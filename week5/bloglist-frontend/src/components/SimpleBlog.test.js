import React from "react"
import { render, fireEvent } from "react-testing-library"
import SimpleBlog from "./SimpleBlog"

test("renders title", () => {
  const simpleblog = {
    title: "näin sitä pyörää ajetaan",
    author: "tietäjä-tiera",
    likes: 3000
  }

  const component = render(<SimpleBlog blog={simpleblog} />)

  component.debug()

  expect(component.container).toHaveTextContent("näin sitä pyörää ajetaan")
})

test("renders author", () => {
  const simpleblog = {
    title: "näin sitä pyörää ajetaan",
    author: "tietäjä-tiera",
    likes: 3000
  }

  const component = render(<SimpleBlog blog={simpleblog} />)

  component.debug()

  expect(component.container).toHaveTextContent("tietäjä-tiera")
})

test("renders title", () => {
  const simpleblog = {
    title: "näin sitä pyörää ajetaan",
    author: "tietäjä-tiera",
    likes: 3000
  }

  const component = render(<SimpleBlog blog={simpleblog} />)

  component.debug()

  expect(component.container).toHaveTextContent("blog has 3000 likes")
})

it("clicking the button calls the event handler once", async () => {
  const simpleblog = {
    title: "näin sitä pyörää ajetaan",
    author: "tietäjä-tiera",
    likes: 3000
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={simpleblog} onClick={mockHandler} />
  )

  const button = component.container.querySelector("button")
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
