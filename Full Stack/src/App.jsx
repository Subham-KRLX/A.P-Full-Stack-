import { useState, useEffect } from 'react'
import './App.css'

const API = 'http://localhost:5000/api'

function App() {
  const [books, setBooks] = useState([])
  const [authors, setAuthors] = useState([])
  const [newBook, setNewBook] = useState({ title: '', price: '', stock: '', authorId: '' })
  const [newAuthor, setNewAuthor] = useState({ name: '', email: '' })

  useEffect(() => {
    fetchBooks()
    fetchAuthors()
  }, [])

  const fetchBooks = async () => {
    const res = await fetch(`${API}/books`)
    const data = await res.json()
    setBooks(data.data || [])
  }

  const fetchAuthors = async () => {
    const res = await fetch(`${API}/authors`)
    const data = await res.json()
    setAuthors(data.data || [])
  }

  const addBook = async (e) => {
    e.preventDefault()
    await fetch(`${API}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook)
    })
    setNewBook({ title: '', price: '', stock: '', authorId: '' })
    fetchBooks()
  }

  const addAuthor = async (e) => {
    e.preventDefault()
    await fetch(`${API}/authors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAuthor)
    })
    setNewAuthor({ name: '', email: '' })
    fetchAuthors()
  }

  const deleteBook = async (id) => {
    await fetch(`${API}/books/${id}`, { method: 'DELETE' })
    fetchBooks()
  }

  return (
    <div>
      <h1>Library</h1>

      <h2>Authors</h2>
      <form onSubmit={addAuthor}>
        <input
          type="text"
          placeholder="Name"
          value={newAuthor.name}
          onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newAuthor.email}
          onChange={(e) => setNewAuthor({ ...newAuthor, email: e.target.value })}
          required
        />
        <button type="submit">Add Author</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(author => (
            <tr key={author.id}>
              <td>{author.id}</td>
              <td>{author.name}</td>
              <td>{author.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Books</h2>
      <form onSubmit={addBook}>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={newBook.stock}
          onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })}
          required
        />
        <select
          value={newBook.authorId}
          onChange={(e) => setNewBook({ ...newBook, authorId: e.target.value })}
          required
        >
          <option value="">Select Author</option>
          {authors.map(author => (
            <option key={author.id} value={author.id}>{author.name}</option>
          ))}
        </select>
        <button type="submit">Add Book</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>${book.price}</td>
              <td>{book.stock}</td>
              <td>{book.author?.name}</td>
              <td><button onClick={() => deleteBook(book.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
