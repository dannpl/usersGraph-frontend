import axios from 'axios';

const api = axios.create({
  baseURL: 'https://graphusers.herokuapp.com',
});

export default api;
