import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { getProductionStats } from "../services/SolarService";
import axios from "axios";

function SolarStats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProductionStats()
      .then((res) => {
        const formatted = Object.entries(res.data).map(([period, value]) => ({
          period,
          production: value,
        }));
        setData(formatted);
      })
      .catch((err) => {
        console.error("Greska pri citanju statistike proizvodnje:", err);
      });
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Prikaz proizvodnje solarne energije na nivou nedelje, meseca, godine</h3>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis label={{ value: "kWh", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="production" fill="#8884d8" name="Proizvodnja" />
      </BarChart>
    </div>
  );
}

export default SolarStats;
