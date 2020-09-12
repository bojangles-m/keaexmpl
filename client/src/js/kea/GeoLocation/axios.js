import axios from 'axios';

const instance = axios.create({ baseURL: __ENV__.GEOLOC_URL });

export default instance;
