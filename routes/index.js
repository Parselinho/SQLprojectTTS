var express = require('express');
var router = express.Router();

const { Book } = require('../models');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const books = await Book.findAll();
    res.json(books.map(book => book.toJSON())); // Send the books as JSON response
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
});

module.exports = router;
