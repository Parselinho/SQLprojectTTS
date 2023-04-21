const express = require('express');
const router = express.Router();
const { Book } = require('../models');

router.get('/books', async (req, res, next) => {
    try {
        const books = await Book.findAll();
        res.render('index', { books });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
