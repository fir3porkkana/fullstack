import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log("meemattiin:", response.data)
  return response.data
}

const add = async content => {
  const newAnecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const post = async anecdote => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return response.data
}

export default { getAll, add, post }
