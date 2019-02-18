import React, { useState, useEffect } from "react"
import axios from "axios"
import serverService from "./services/serverService"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    console.log("effect")
    axios.get("/api/persons").then(response => {
      console.log("promise fulfilled")
      setPersons(response.data)
    })
  }, [])

  const addPerson = event => {
    event.preventDefault()
    console.log("prevent default", event.target.value)

    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(personObject)
    console.log(persons.includes(personObject))

    if (!persons.map(person => person.name).includes(newName)) {
      serverService
        .post(personObject)
        .then(res =>
          serverService.get().then(result => {
            console.log("result", result)
            setPersons(result)
            setErrorMessage(`henkilö '${newName}' lisätty`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        )
        .catch(error => {
          console.log("vilduils")
          setErrorMessage(error.response.data)
        })
    } else {
      const queryResult = window.confirm(
        `${newName} on jo luettelossa. Korvataanko vanha numero uudella?`
      )
      if (queryResult) {
        const id = persons.find(person => person.name === newName).id
        console.log("tunnistettavaa ", id)
        serverService.put({ replacement: personObject, id }).then(() =>
          serverService
            .get()
            .then(result => {
              console.log("result", result)
              setPersons(result)
            })
            .catch(error => {
              setErrorMessage(`henkilö '${newName}' oli jo poistettu`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
        )

        setErrorMessage(`henkilön '${newName}' numero muutettu`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = event => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    console.log(event.target.value)
    setFilter(event.target.value)
    if (event.target.value !== "") {
      setShowAll(false)
    } else setShowAll(true)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.includes(filter))

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <div>
        <Notification message={errorMessage} />
      </div>

      <div>
        <Filter filter={filter} onChange={handleFilterChange} />
      </div>

      <h3>lisää uusi</h3>

      <form onSubmit={addPerson}>
        <div>
          nimi: <input value={newName} onChange={handleNameChange} />
        </div>

        <div>
          numero: <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      <div>
        <Persons
          persons={persons}
          personsToShow={personsToShow}
          setPersons={setPersons}
          setErrorMessage={setErrorMessage}
        />
      </div>
    </div>
  )
}

const Filter = props => {
  console.log()

  return (
    <div>
      rajaa tuloksia: <input value={props.filter} onChange={props.onChange} />
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className="error">{message}</div>
}

const Person = ({ person, persons, setPersons, setErrorMessage }) => {
  console.log("person sanoo", person)
  return (
    <>
      {person.name} {person.number}
      <button
        onClick={() =>
          handleDeletion(person, persons, setPersons, setErrorMessage)
        }
      >
        poista{" "}
      </button>
    </>
  )
}

const handleDeletion = (person, persons, setPersons, setErrorMessage) => {
  const result = window.confirm(`poistetaanko ${person.name}`)
  const iidee = person.id
  if (result) {
    serverService.remove(person).then(rel => {
      setErrorMessage(`henkilö ${person.name} poistettu`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
    serverService.get().then(backendresult => {
      console.log("result", backendresult)
      setPersons(backendresult)
      setPersons(persons.filter(person => person.id !== iidee))
    })
  }
}

const Persons = ({ persons, personsToShow, setPersons, setErrorMessage }) => {
  console.log(personsToShow)

  return (
    <ul>
      {personsToShow.map(person => (
        <li key={person.id}>
          <Person
            person={person}
            persons={persons}
            setPersons={setPersons}
            setErrorMessage={setErrorMessage}
          />
        </li>
      ))}
    </ul>
  )
}
export default App
