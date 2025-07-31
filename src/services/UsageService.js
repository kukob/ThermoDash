import axios from "axios";

export const getDeviceConsumption = async () => {
  const response = await axios.get("http://localhost:8080/api/usage/consumption-by-device");
  return response.data;
};

export const getDailyUsageStats = () => {
  return axios.get('http://localhost:8080/api/usage/stats/daily', {
    withCredentials: true
  });
};

export const getConsumptionByDevice = () => {
  return axios.get("http://localhost:8080/api/usage/consumption-by-device", {
    withCredentials: true
  });
};

export const getDailyDeviceUsageStats = () => {
  return axios.get("http://localhost:8080/api/usage/stats/daily-device", {
    withCredentials: true,
  });
};

export const getUsageSummaryStats = () => {
  return axios.get("http://localhost:8080/api/usage/stats/summary", {
    withCredentials: true,
  });
};


export const submitUsage = (usageData) => {
  return axios.post("http://localhost:8080/api/usage", usageData, {
    withCredentials: true,
  });
};

export const getMonthlyConsumptionByDevice = (usageData) => {
  return axios.post("http://localhost:8080/api/usage/stats/monthly", usageData, {
    withCredentials: true,
  });
};

export const getAverage = () => {
  return axios.get("http://localhost:8080/api/usage/stats/average", {
    withCredentials: true,
  });
};
