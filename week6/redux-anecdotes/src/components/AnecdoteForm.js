import React from "react"
import { newAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = props => {
  const create = event => {
    event.preventDefault()
    const doteContent = event.target.dote.value
    console.log("doteContent:", doteContent)
    props.store.dispatch(newAnecdote(doteContent))
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

export default AnecdoteForm
