import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  try {
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (exception) {
    console.log(exception)
  }
}

const update = async (id, newObject) => {
  try {
    const request = await axios.put(`${baseUrl}/${id}`, newObject)
    return request(response => response.data)
  } catch (exception) {
    console.log(exception)
  }
}

const remove = async id => {
  try {
    await axios.delete(`${baseUrl}/${id}`)
  } catch (exception) {
    console.log(exception)
  }
}

export default { getAll, create, update, remove, setToken }
