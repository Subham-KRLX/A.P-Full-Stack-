const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    searchBooks,
} = require('../controllers/book.controller');

// GET /api/books - Get all books
router.get('/', getAllBooks);

// GET /api/books/search - Search books
router.get('/search', searchBooks);

// GET /api/books/:id - Get single book
router.get('/:id', getBookById);

// POST /api/books - Create new book
router.post('/', createBook);

// PUT /api/books/:id - Update book
router.put('/:id', updateBook);

// DELETE /api/books/:id - Delete book
router.delete('/:id', deleteBook);

module.exports = router;
