const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "VOTE":
      return `you voted for "${action.anecdote.content}"`
    case "ADD_NEW":
      return `"${action.data.content}" added`
    case "CLEAR_MESSAGE":
      return null
    default:
      return state
  }
}

export const clearMessage = () => {
  return {
    type: "CLEAR_MESSAGE"
  }
}

export default notificationReducer
