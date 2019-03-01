import React from "react"
import { connect } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"
import { clearMessage } from "../reducers/notificationReducer"

const AnecdoteForm = props => {
  const create = event => {
    event.preventDefault()
    const doteContent = event.target.dote.value
    console.log("doteContent:", doteContent)
    props.newAnecdote(doteContent)
    setTimeout(() => {
      props.clearMessage()
    }, 3000)
    event.target.dote.value = ""
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="dote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchTopProps = {
  newAnecdote,
  clearMessage
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchTopProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
