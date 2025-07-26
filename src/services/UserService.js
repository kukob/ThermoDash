import axios from 'axios';

export const registerUser = (user) => {
  return axios.post('http://localhost:8080/api/users/register', user);
};
