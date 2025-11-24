const express = require('express');
const router = express.Router();
const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
} = require('../controllers/author.controller');

// GET /api/authors - Get all authors
router.get('/', getAllAuthors);

// GET /api/authors/:id - Get single author
router.get('/:id', getAuthorById);

// POST /api/authors - Create new author
router.post('/', createAuthor);

// PUT /api/authors/:id - Update author
router.put('/:id', updateAuthor);

// DELETE /api/authors/:id - Delete author
router.delete('/:id', deleteAuthor);

module.exports = router;
