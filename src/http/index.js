import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37112193-67aeb47d946901eedc654e2d8';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export { api };
