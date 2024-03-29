require('dotenv').config();
require('./models/connection');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var monthlyRouter = require('./routes/monthlyExpenses');
var usersRouter = require('./routes/users');
/*
var tripsRouter = require('./routes/trips');
var cartsRouter = require('./routes/carts');
*/

var app = express();

const cors = require('cors'); // Installation de Cors

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://127.0.0.1:5500',
      'http://localhost:3000',
      'http://localhost:3001',
    ];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions)); // Installation de Cors

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/monthly', monthlyRouter);
app.use('/users', usersRouter);
/*
app.use('/trips', tripsRouter);
app.use('/carts', cartsRouter);
*/

module.exports = app;
