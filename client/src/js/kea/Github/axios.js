import axios from 'axios';

const instance = axios.create({
  baseURL: __ENV__.API_GITHUB_URL,
});

export default instance;
