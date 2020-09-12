import axios from 'axios';
import { makeUri } from './helpers';

const instance = axios.create({ baseURL: makeUri(__ENV__.API) });

export default instance;
