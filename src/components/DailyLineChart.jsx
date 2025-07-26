import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";
import { getDailyUsageStats } from "../services/UsageService";

function DailyLineChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
     getDailyUsageStats()
    .then(res => {
      setData(res.data);
    })
    .catch(err => {
      console.error("Greška pri učitavanju podataka:", err);
    });
  }, []);

  return (
    <div>
      <h2>Istorija potrošnje po danima</h2>
      <LineChart width={700} height={350} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis label={{ value: "kWh", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="consumption" stroke="#8884d8" name="Potrošnja (kWh)" />
      </LineChart>
    </div>
  );
}

export default DailyLineChart;
