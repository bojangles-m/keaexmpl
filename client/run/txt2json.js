const path = require('path');
const txt2json = require('@bojangles/txt2json');
const { cities, porperties } = require('@bojangles/allcities');

const input = cities.file();
const output = path.resolve(`src/assets/cities/cities5000.json`);

try {
  txt2json(input, output, porperties);
} catch (error) {
  console.log(error);
}
