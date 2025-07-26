
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/devices';

export const getAllDevices = () => {
  return axios.get(API_URL);
};

