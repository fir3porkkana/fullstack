import React, { useState } from 'react'

const NewBirthyear = ({ show, authors, editAuthor }) => {
    const [name, setName] = useState("")
    const [year, setYear] = useState("")

    if (!show) {
        return null
    }


    let authorNames = authors
    if (authors.loading) {
        console.log('loadingsgs');

        return <div> loading...</div>
    }

    authorNames = authors.data.allAuthors.map(a => a.name)
    console.log("authorNames: ", authorNames)


    const submit = async (e) => {
        e.preventDefault()

        const result = await editAuthor(
            { variables: { name, setBornTo: parseInt(year, 10) } }
        )

        console.log('supmitted :⁾)', result)

        setName("")
        setYear("")
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    author name
                    <select onChange={({ target }) => setName(target.value)}>
                        <option value="-" >-</option>
                        {
                            authorNames.map(author => (
                                <option value={author} >{author}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    author birthyear
                    <input
                        value={year}
                        onChange={({ target }) => setYear(target.value)} />
                </div>
                <button type='submit'>change birthyear</button>
            </form>
        </div>
    )
}

export default NewBirthyear