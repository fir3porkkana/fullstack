import anecdoteService from "../services/anecdotes"

const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state)
  console.log("action", action)

  switch (action.type) {
    case "VOTE":
      let anecdoteToVote = action.votedAnecdote
      console.log("ancedote:", action)
      const dotes = state.map(a => {
        console.log("a:", anecdoteToVote)
        return a.id !== anecdoteToVote.id ? a : anecdoteToVote
      })
      console.log("dotes:", dotes)
      return dotes
    case "ADD_NEW":
      return state.concat(action.data)
    case "INIT_DOTES":
      return action.data
    default:
      return state
  }
}

export const initialiseAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_DOTES",
      data: anecdotes
    })
  }
}

export const voteAnecdote = anecdote => {
  anecdote.votes = anecdote.votes + 1
  return async dispatch => {
    const votedAnecdote = await anecdoteService.post(anecdote)
    console.log("votedAnecdote:", votedAnecdote)
    dispatch({
      type: "VOTE",
      votedAnecdote
    })
  }
}

export const newAnecdote = content => {
  return async dispatch => {
    const newDote = await anecdoteService.add(content)
    dispatch({
      type: "ADD_NEW",
      data: newDote
    })
  }
}

export default anecdoteReducer
