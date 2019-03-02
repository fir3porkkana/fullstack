const notificationReducer = (state = null, action) => {
  console.log("ÄKTIÖÖNI:", action)
  switch (action.type) {
    case "MUUTOS":
      return `${action.content}`
    case "CLEAR_MESSAGE":
      return null
    default:
      return state
  }
}

export const setMessage = (content, seconds) => {
  console.log("CONTENT SETMESSAGESSA:", content)
  return async dispatch => {
    dispatch({
      type: "MUUTOS",
      content
    })
    setTimeout(() => {
      dispatch({
        type: "CLEAR_MESSAGE"
      })
    }, 1000 * seconds)
  }
}

export const clearMessage = () => {
  return {
    type: "CLEAR_MESSAGE"
  }
}

export default notificationReducer
