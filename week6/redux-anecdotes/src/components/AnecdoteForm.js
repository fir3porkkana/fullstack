import React from "react"
import { connect } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"
import { setMessage } from "../reducers/notificationReducer"

const AnecdoteForm = props => {
  const create = event => {
    event.preventDefault()
    const doteContent = event.target.dote.value
    event.target.dote.value = ""
    console.log("doteContent:", doteContent)
    console.log("PROPS.NEWANECDOTE HERE", props.newAnecdote)
    props.newAnecdote(doteContent)
    props.setMessage(`"${doteContent}" added`, 3.5)
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
  setMessage
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchTopProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
