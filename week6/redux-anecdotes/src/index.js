// import React from "react"
// import ReactDOM from "react-dom"
// import { createStore, combineReducers } from "redux"
// import { Provider } from "react-redux"
// import App from "./App"
// import anecdoteReducer, {
//   initialiseAnecdotes
// } from "./reducers/anecdoteReducer"
// import notificationReducer from "./reducers/notificationReducer"
// import filterReducer from "./reducers/filterReducer"
// import anecdoteService from "./services/anecdotes"

// const reducer = combineReducers({
//   anecdotes: anecdoteReducer,
//   notification: notificationReducer,
//   filter: filterReducer
// })

// const store = createStore(reducer)

// anecdoteService
//   .getAll()
//   .then(anecdotes => store.dispatch(initialiseAnecdotes(anecdotes)))

// const render = () => {
//   ReactDOM.render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     document.getElementById("root")
//   )
// }

// render()
// store.subscribe(render)
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./App"
import store from "./store"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
