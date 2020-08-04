import {apiUri} from './helpers';
import axios from 'axios';

const API_URI = apiUri(__ENV__);

const get = (path, options = {}) => {
  const url = API_URI + path;

  return axios.get(url);
};

const del = (path, options = {}) => {
  const url = API_URI + path;

  return axios.delete(url);
};

const post = (path, options = {}) => {
  const url = API_URI + path;

  return axios.post(url, options);
};

const patch = (path, options = {}) => {
  const url = API_URI + path;

  return axios.patch(url, options);
};

export default {
  get,
  post,
  patch,
  del,
};
