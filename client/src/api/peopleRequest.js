const API_PEOPLE = import.meta.env.VITE_API_PEOPLE;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getPeopleRequest = (page) =>
  `${API_PEOPLE}/popular?page=${page}&api_key=${API_KEY}`;

export const getPeopleDetailRequest = (id) =>
  `${API_PEOPLE}/${id}?api_key=${API_KEY}&append_to_response=external_ids%2Cexternal_ids%2Cimages%2Cmovie_credits%2Ctv_credits`;
