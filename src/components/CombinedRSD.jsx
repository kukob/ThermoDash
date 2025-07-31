import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { getUsageSummaryStats } from '../services/UsageService';
import { getProductionStats } from '../services/SolarService'; 

const PRICE_PER_KWH = 10;

function CombinedRSD() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Promise.all([getUsageSummaryStats(), getProductionStats()])
      .then(([usageRes, solarRes]) => {
        const usageData = usageRes.data;
        const solarData = solarRes.data;

        const merged = Object.keys(usageData).map(period => ({
          period,
          consumption: usageData[period] * PRICE_PER_KWH,
          production: solarData[period] * PRICE_PER_KWH,
        }));

        setData(merged);
      })
      .catch((err) => {
        console.error("Greska pri ucitavanju statistike:", err);
      });
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      {/* <h3>Prikaz potrošnje i proizvodnje energije (RSD) na nivou nedelje, meseca i godine</h3> */}
      <BarChart width={600} height={350} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis label={{ value: "RSD", angle: -90, position: "insideLeft" }} />
        <Tooltip formatter={(value) => `${value} din`} />
        <Legend />
        <Bar dataKey="consumption" fill="#8884d8" name="Potrosnja (din)" />
        <Bar dataKey="production" fill="#82ca9d"name="Proizvodnja (din)" />
      </BarChart>
    </div>
  );
}

export default CombinedRSD;
