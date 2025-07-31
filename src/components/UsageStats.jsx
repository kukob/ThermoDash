import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { getUsageSummaryStats } from '../services/UsageService';

function UsageStats() {
  const [data, setData] = useState([]);

  useEffect(() => {
      getUsageSummaryStats()
      .then((res) => {
        const formatted = Object.entries(res.data).map(([period, value]) => ({
          period,
          consumption: value
        }));
        setData(formatted);
      })
      .catch((err) => {
        console.error("Greska pri citanju statistike:", err);
      });
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      {/* <h3>Prikaz potrosnje na nivou nedelje, meseca, godine</h3> */}
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis label={{ value: "kWh", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="consumption" fill="#8884d8" name="Potrosnja " />
      </BarChart>
    </div>
  );
}

export default UsageStats;
