const prisma = require('../config/database');

// Get all authors with their books
const getAllAuthors = async (req, res) => {
    try {
        const authors = await prisma.author.findMany({
            include: {
                books: true,
                _count: {
                    select: { books: true },
                },
            },
            orderBy: {
                name: 'asc',
            },
        });

        res.json({
            success: true,
            count: authors.length,
            data: authors,
        });
    } catch (error) {
        console.error('Error fetching authors:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch authors',
        });
    }
};

// Get single author by ID
const getAuthorById = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await prisma.author.findUnique({
            where: { id: parseInt(id) },
            include: {
                books: true,
                _count: {
                    select: { books: true },
                },
            },
        });

        if (!author) {
            return res.status(404).json({
                success: false,
                error: 'Author not found',
            });
        }

        res.json({
            success: true,
            data: author,
        });
    } catch (error) {
        console.error('Error fetching author:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch author',
        });
    }
};

// Create new author
const createAuthor = async (req, res) => {
    try {
        const { name, email } = req.body;

        const author = await prisma.author.create({
            data: {
                name,
                email,
            },
        });

        res.status(201).json({
            success: true,
            data: author,
        });
    } catch (error) {
        console.error('Error creating author:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create author',
        });
    }
};

// Update author
const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const author = await prisma.author.update({
            where: { id: parseInt(id) },
            data: {
                ...(name && { name }),
                ...(email && { email }),
            },
        });

        res.json({
            success: true,
            data: author,
        });
    } catch (error) {
        console.error('Error updating author:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update author',
        });
    }
};

// Delete author
const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.author.delete({
            where: { id: parseInt(id) },
        });

        res.json({
            success: true,
            message: 'Author deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete author',
        });
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};
