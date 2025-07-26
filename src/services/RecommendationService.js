import axios from "axios";

export const getCurrentRecommendation = () => {
  return axios.get("http://localhost:8080/api/recommendation", {
    withCredentials: true
  });
};

export const getHourlyRecommendations = () => {
  return axios.get("http://localhost:8080/api/recommendation/hourly", {
    withCredentials: true
  });
};
