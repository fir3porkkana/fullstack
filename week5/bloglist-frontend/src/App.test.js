import App from "./App"
import React from "react"
import { render, waitForElement } from "react-testing-library"
jest.mock("./services/blogs")

describe("<App/>", () => {
  it("if no logged-in user, blogs are not rendered", async () => {
    const component = render(<App />)

    component.rerender(<App />)

    await waitForElement(() => component.getByText("log in"))

    component.debug()

    const blogs = component.container.querySelectorAll(".blog")
    expect(blogs.length).toBe(0)
    expect(component.container).not.toHaveTextContent("äitis on jonne")
  })

  it("if a user is logged in, blogs are shown", async () => {
    const user = {
      username: "tester",
      token: "13121917",
      name: "Testimies Tappi"
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user))
    const component = render(<App />)

    await component.rerender(<App />)

    component.debug()

    expect(component.container).toHaveTextContent("äitis on jonne")
  })
})
