import React from 'react'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  let books = props.books
  if (books.loading) {
    return <div> loading...</div>
  }
  console.log('log in books', books);

  books = books.data.allBooks

  console.log('log 2 in books', books);


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books