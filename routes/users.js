var express = require('express');
var router = express.Router();

const { Book } = require('../models');

// Home route should redirect to the /books route
router.get('/', async function (req, res, next) {
  res.redirect('/books');
});

// Shows the full list of books
router.get('/books', async function (req, res, next) {
  try {
    const books = await Book.findAll();
    res.render('index', { books });
  } catch (error) {
    next(error);
  }
});


// Shows the create new book form
router.get('/books/new', function (req, res, next) {
  res.render('new-book'); // Update the render call to use 'new-book'
});

// Posts a new book to the database
router.post('/books/new', async function (req, res, next) {
  try {
    await Book.create(req.body);
    res.redirect('/books');
  } catch (error) {
    next(error);
  }
});

// Shows book detail form
router.get('/books/:id', async function (req, res, next) {
  try {
    const book = await Book.findByPk(req.params.id);
    res.render('update-book', { book }); // Update the render call to use 'update-book'
  } catch (error) {
    next(error);
  }
});

// Updates book info in the database
router.post('/books/:id', async function (req, res, next) {
  try {
    const book = await Book.findByPk(req.params.id);
    await book.update(req.body);
    res.redirect('/books');
  } catch (error) {
    next(error);
  }
});

// Deletes a book
router.post('/books/:id/delete', async function (req, res, next) {
  try {
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.redirect('/books');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
