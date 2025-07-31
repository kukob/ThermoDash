import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import axios from "axios";
import { getAverage } from "../services/UsageService";
import { getUsageSummaryStats } from "../services/UsageService";

function StatsAverage() {
  const [data, setData] = useState([]);

  useEffect(() => {

    Promise.all([
      getUsageSummaryStats(),
      getAverage()
    ])
      .then(([userRes, avgRes]) => {
        const user = userRes.data;
        const avg = avgRes.data;

        const combined = ["weekly", "monthly", "yearly"].map(period => ({
          period,
          userConsumption: user[period] || 0,
          averageConsumption: avg[period] || 0
        }));

        setData(combined);
      })
      .catch(error => {
        console.error("Greska pri ucitavanju podataka:", error);
      });
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      
      <BarChart width={650} height={350} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis label={{ value: "kWh", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
          <Bar dataKey="averageConsumption" fill="#82ca9d" name="Prosecna potrosnja" />
          <Bar dataKey="userConsumption" fill="#8884d8"  name="Tvoja potrosnja"/>
      </BarChart>
    </div>
  );
}

export default StatsAverage;
