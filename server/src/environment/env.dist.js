const API_PORT = 3000;
const API_HOST = 'localhost';
const API_PROTOCOL = 'http';

const mongodb = {
  PORT: 27017,
  HOST: HOST,
  DB: 'books',
};

module.exports = {
  API_PORT,
  API_HOST,
  API_PROTOCOL,
  MONGO_URI: `mongodb://${mongodb.HOST}:${mongodb.PORT}/${mongodb.DB}`,
};
