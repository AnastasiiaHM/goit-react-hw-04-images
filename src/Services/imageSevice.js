import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33879841-ec1dd1c9c0f048473c9d8babe';
const PARAMS = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
};

export async function getImages(query, page) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&page=${page}`;
  try {
    const response = await axios.get(`${url}`, {
      params: PARAMS,
    });

    return response;
  } catch (error) {
    console.log(error.message);
  }
}
