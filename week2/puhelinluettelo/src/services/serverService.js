import axios from "axios"
const baseUrl = "/api/persons"

const post = newPostee => {
  return axios.post(baseUrl, newPostee)
}

const get = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const remove = removee => {
  console.log(removee)
  return axios.delete(`${baseUrl}/${removee.id}`)
}

const put = ({ replacement, id }) => {
  console.log("tunnistettavaa putissa", id)
  console.log(replacement)
  return axios.put(`${baseUrl}/${id}`, replacement)
}

export default {
  post,
  get,
  remove,
  put
}
