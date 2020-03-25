import React from 'react'
// import { gql } from 'apollo-boost'
// import { useApolloClient } from '@apollo/react-hooks'



const Authors = (props) => {
  if (!props.show) {
    return null
  }

  console.log('propsit authors', props);

  let authors = props.authors
  if (authors.loading) {
    return <div> loading...</div>
  }

  authors = authors.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors