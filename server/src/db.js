const mongoose = require('mongoose');
const { ENV } = require('./lib/helpers');

// mongoose options
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,

  // The maximum number of sockets the MongoDB driver will keep open for this connection
  poolSize: 10,

  // automatically build indexes defined in your schema
  // good for dev turn of for Production
  autoIndex: false,

  // when the driver is disconnected
  // database operations will fail immediately
  bufferMaxEntries: 0,
  bufferCommands: false,
};

// connect to mongo DB
mongoose.connect(ENV.MONGO_URI, options);

// get connection
const db = mongoose.connection;

db.on(
  'error',
  console.error.bind(console, `MongoDB Connection Error: ${ENV.MONGO_URI}`),
);
db.once('open', () =>
  console.log(
    `MongoDB database connection successfully established at: ${ENV.MONGO_URI}`,
  ),
);
