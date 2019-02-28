import React from "react"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = props => {
  const anecdotes = props.store.getState()

  function compareVotes(a, b) {
    return b.votes - a.votes
  }
  const vote = anecdote => {
    console.log("äänestetään anekdoottia: ", anecdote)
    props.store.dispatch(voteAnecdote(anecdote))
    console.log("anekdootti äänestyksen jälkeen: ", anecdote)
  }
  return (
    <div>
      {anecdotes.sort(compareVotes).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
