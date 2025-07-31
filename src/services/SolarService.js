import axios from "axios";

export const submitSolarPanel = (panelData) => {
  return axios.post("http://localhost:8080/api/solar", panelData, {
    withCredentials: true,
  });   
};



export function getDailyProductionStats() {
  return axios.get("http://localhost:8080/api/solar/daily", {
    withCredentials: true,
  });   
}

export function getProductionStats() {
  return  axios.get("http://localhost:8080/api/solar/summary", {
    withCredentials: true,
  });   
}

