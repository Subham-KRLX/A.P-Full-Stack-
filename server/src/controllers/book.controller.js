const prisma = require('../config/database');

// Get all books with author
const getAllBooks = async (req, res) => {
    try {
        const books = await prisma.book.findMany({
            include: {
                author: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.json({
            success: true,
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch books',
        });
    }
};

// Get single book by ID
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await prisma.book.findUnique({
            where: { id: parseInt(id) },
            include: {
                author: true,
            },
        });

        if (!book) {
            return res.status(404).json({
                success: false,
                error: 'Book not found',
            });
        }

        res.json({
            success: true,
            data: book,
        });
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch book',
        });
    }
};

// Create new book
const createBook = async (req, res) => {
    try {
        const { title, price, stock, authorId } = req.body;

        const book = await prisma.book.create({
            data: {
                title,
                price: parseFloat(price),
                stock: stock ? parseInt(stock) : 0,
                authorId: parseInt(authorId),
            },
            include: {
                author: true,
            },
        });

        res.status(201).json({
            success: true,
            data: book,
        });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create book',
        });
    }
};

// Update book
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, stock, authorId } = req.body;

        const book = await prisma.book.update({
            where: { id: parseInt(id) },
            data: {
                ...(title && { title }),
                ...(price !== undefined && { price: parseFloat(price) }),
                ...(stock !== undefined && { stock: parseInt(stock) }),
                ...(authorId && { authorId: parseInt(authorId) }),
            },
            include: {
                author: true,
            },
        });

        res.json({
            success: true,
            data: book,
        });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update book',
        });
    }
};

// Delete book
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.book.delete({
            where: { id: parseInt(id) },
        });

        res.json({
            success: true,
            message: 'Book deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete book',
        });
    }
};

// Search books
const searchBooks = async (req, res) => {
    try {
        const { q, author } = req.query;

        const where = {};

        if (q) {
            where.title = { contains: q };
        }

        if (author) {
            where.author = {
                name: { contains: author },
            };
        }

        const books = await prisma.book.findMany({
            where,
            include: {
                author: true,
            },
        });

        res.json({
            success: true,
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to search books',
        });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    searchBooks,
};
