import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import axios from "axios";

import { getUsageSummaryStats } from '../services/UsageService';
import { getProductionStats } from "../services/SolarService";

function StatsCombined() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Promise.all([
      getUsageSummaryStats(),
      getProductionStats()
    ])
      .then(([usageRes, solarRes]) => {
        const usageData = usageRes.data; 
        const solarData = solarRes.data; 

        const merged = Object.keys(usageData).map(period => ({
          period,
          consumption: usageData[period] || 0,
          production: solarData[period] || 0
        }));

        setData(merged);
      })
      .catch(err => {
        console.error("Greska pri ucitavanju podataka:", err);
      });
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      {/* <h3>Proizvodnja i potrošnja energije na nivou nedelje, meseca, godine</h3> */}
      <BarChart width={600} height={350} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis label={{ value: "kWh", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="consumption" fill="#8884d8" name="Potrosnja" />
        <Bar dataKey="production" fill="#82ca9d"name="Proizvodnja" />
      </BarChart>
    </div>
  );
}

export default StatsCombined;
