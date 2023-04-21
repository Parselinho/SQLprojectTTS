var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/books');

var app = express();

const { sequelize } = require('./models')

// Test database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
    return sequelize.sync();
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = createError(404);
  err.status = 404;
  err.message = 'Page not found';
  res.status(err.status);
  res.render('page-not-found', { err });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // set status and message properties if not already defined
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';

  // log error details to the console
  console.error(`Error ${err.status}: ${err.message}`);

  // render the error page
  res.status(err.status);
  res.render('error', { err });
});

module.exports = app;
