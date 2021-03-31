var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
var favicon = require('serve-favicon');
// const jwt = require('jsonwebtoken');
//tambahan sendiri
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//tambahan sendiri 
var uniController = require('./routes/tes');
var login = require('./routes/login');
var token = require('./routes/token');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// custom middleware create
const LoggerMiddleware = (req,res,next) =>{
  console.log(`Logged  ${req.url}  ${req.method} -- ${new Date()}`)
  next();
}

var app = express();

// application level middleware
app.use(LoggerMiddleware);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares
app.use(logger('dev'));
// app.use(helmet());
// This disables the `referrerPolicy` middleware but keeps the rest.
app.use(
  helmet({
      referrerPolicy: false,
  })
);

app.use(limiter); 

// whitelist
// const whitelist = ['http://localhost:3000/users']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions));
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Serve Favicon
app.use(favicon('favicon.ico'))
app.use(favicon(path.join(__dirname, 'public', '../favicon.ico')));

// tambahan sendiri 
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.use('/', indexRouter);
app.use('/api/users', usersRouter);

// tambahan sendiri 
app.use('/tes', uniController);

/* Authentication User */
app.use('/login', login);
app.use('/token/post', login);
app.use('/token', token);
app.use('/token/refreshtoken', token);
app.use('/token/logout', token);

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
  res.render('error');
});

module.exports = app;
