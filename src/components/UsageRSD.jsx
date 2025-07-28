import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { getUsageSummaryStats } from '../services/UsageService';

const PRICE_PER_KWH = 10;

function UsageRSD() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsageSummaryStats()
      .then((res) => {
        const formatted = Object.entries(res.data).map(([period, value]) => ({
          period,
          consumption: value * PRICE_PER_KWH, 
        }));
        setData(formatted);
      })
      .catch((err) => {
        console.error("Greska pri citanju statistike:", err);
      });
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Prikaz potrošnje (RSD) na nivou nedelje, meseca i godine</h3>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis label={{ value: "RSD", angle: -90, position: "insideLeft" }} />
        <Tooltip formatter={(value) => `${value} din`} />
        <Legend />
        <Bar dataKey="consumption" fill="#82ca9d" name="Potrosnja (din)" />
      </BarChart>
    </div>
  );
}

export default UsageRSD;
