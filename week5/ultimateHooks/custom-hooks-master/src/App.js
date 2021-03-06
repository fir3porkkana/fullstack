import React, { useState, useEffect } from "react"
import axios from "axios"
//osa5: 1, 2, 3, 4, 5, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21

const useField = type => {
  const [value, setValue] = useState("")

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  // ...
  useEffect(() => {
    axios
      .get(baseUrl)
      .then(bigBootyBitches => setResources(bigBootyBitches.data))
  }, [])

  const create = async resource => {
    // ...
    await axios.post(baseUrl, resource)
    const request = await axios.get(baseUrl)
    setResources(request.data)
  }

  const service = {
    create
  }

  return [resources, service]
}

const App = () => {
  const content = useField("text")
  const name = useField("text")
  const number = useField("text")

  const [notes, noteService] = useResource("http://localhost:3005/notes")
  const [persons, personService] = useResource("http://localhost:3005/persons")
  console.log("notes:", notes)
  console.log("persons:", persons)

  const handleNoteSubmit = event => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = event => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  )
}

export default App
