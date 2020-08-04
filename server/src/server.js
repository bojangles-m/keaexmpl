const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const {ENV} = require('./lib/helpers');
const allowHeaders = require('./middleware/allowHeaders');

// invoke an instance of express application
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// Our DB Configuration
require('./db');

// Init allowed headers Middleware
app.use(allowHeaders);

// HTTP request logger middleware for node.js
app.use(morgan('dev'));

// Cors - Init Middleware to allows AJAX requests to skip the Same-origin policy
// and access resources from remote hosts.
app.use(cors());

// Helmet helps you secure your Express apps by setting various HTTP headers.
// It’s not a silver bullet, but it can help!
app.use(helmet());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// ----------------------------------------------------------
// routings
// ----------------------------------------------------------
app.use('/books', require('./routes/book.router'));

app.listen(ENV.API_PORT, () =>
  console.log(`Server is running on Port: ${ENV.API_PORT}`),
);
