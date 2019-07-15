var createError = require('http-errors');
var express = require('express');
var path = require('path');
var dotenv = require('dotenv');
dotenv.config();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.on('open', () => console.log('Db connection is active'));

var apiRouter = require('./api/routes/index');

var app = express();

console.log(process.env.MONGODB_URI);

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var corsOptions =  process.env.NODE_ENV === 'prod' ? { origin: 'https://dev-diaries.netlify.com' } : {};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
