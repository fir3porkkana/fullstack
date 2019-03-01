import React from "react"
import { connect } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { clearMessage } from "../reducers/notificationReducer"

const AnecdoteList = props => {
  const anecdotes = props.visibleAnecdotes

  function compareVotes(a, b) {
    return b.votes - a.votes
  }
  const vote = anecdote => {
    console.log("äänestetään anekdoottia: ", anecdote)
    props.voteAnecdote(anecdote)
    console.log("anekdootti äänestyksen jälkeen: ", anecdote)
    setTimeout(() => {
      props.clearMessage()
    }, 3000)
  }
  console.log("STATEN FILTER TÄÄLLÄ:", props.filter)
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

const dotesToShow = ({ anecdotes, filter }) => {
  console.log("DOTES TO SHOW:N anecdotes", anecdotes)
  return anecdotes.filter(a => a.content.includes(filter))
}

const mapDispatchToProps = {
  voteAnecdote,
  clearMessage
}

const mapStateToProps = state => {
  return {
    visibleAnecdotes: dotesToShow(state)
  }
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes
