import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { getDailyDeviceUsageStats } from "../services/UsageService";

function UsageDailyDeviceChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
     getDailyDeviceUsageStats()
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error("Greska pri ucitavanju dnevnih statistika:", err);
      });
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Potrosnja po danima i uredjajima</h3>
      <BarChart width={700} height={350} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis label={{ value: "kWh", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="consumption" name="Potrošnja (kWh)" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default UsageDailyDeviceChart;
