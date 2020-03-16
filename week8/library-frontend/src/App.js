import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import NewBirhtyear from './components/NewBirthyear'


import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'


const CREATE_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!)
{
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author{
      name
    },
    published,
    genres
  }
}
`

const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!)
{
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name,
    id,
    born
  }
}
`

const ALL_AUTHORS = gql`
{
  allAuthors  {
    name,
    id,
    born
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    title,
    published
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [addBook] = useMutation(CREATE_BOOK, { refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }] })
  const [editAuthor] = useMutation(EDIT_AUTHOR, { refetchQueries: [{ query: ALL_AUTHORS }] })


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('birthyear')}>set birthyear</button>

      </div>

      <Authors
        show={page === 'authors'}
        authors={authors}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
        authors={authors}
      />

      <NewBirhtyear
        show={page === "birthyear"}
        authors={authors}
        editAuthor={editAuthor}
      />

    </div>
  )
}

export default App