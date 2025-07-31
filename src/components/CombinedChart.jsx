import { useEffect, useState } from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";
import { getDailyUsageStats } from "../services/UsageService";
import { getDailyProductionStats } from "../services/SolarService";

function CombinedEnergyChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Promise.all([getDailyUsageStats(), getDailyProductionStats()])
      .then(([usageRes, productionRes]) => {
        const usageData = usageRes.data;
        const productionData = productionRes.data;

        const mergedMap = new Map();

        usageData.forEach(item => {
          mergedMap.set(item.date, {
            date: item.date,
            consumption: item.consumption,
            energyProduced: 0,
          });
        });

        productionData.forEach(item => {
          if (mergedMap.has(item.date)) {
            mergedMap.get(item.date).energyProduced = item.energyProduced;
          } else {
            mergedMap.set(item.date, {
              date: item.date,
              consumption: 0,
              energyProduced: item.energyProduced,
            });
          }
        });

        const mergedData = Array.from(mergedMap.values()).sort((a, b) =>
          new Date(a.date) - new Date(b.date)
        );

        setData(mergedData);
      })
      .catch(err => {
        console.error("Greska pri ucitavanju podataka:", err);
      });
  }, []);

  return (
    <div>
      {/* <h2 style={{ textAlign: "center" }}>Zajednicki prikaz</h2>
      <h3>Proizvodnja i potrosnja energije po danima</h3> */}
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        
        <YAxis
          label={{ value: "kWh", angle: -90, position: "insideLeft" }}
        />

        <Tooltip />
        <Legend />

        <Line
          type="monotone"
          dataKey="consumption"
          stroke="#8884d8"
          name="Potrosnja (kWh)"
          dot={{ r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="energyProduced"
          stroke="#82ca9d"
          name="Proizvodnja (kWh)"
          dot={{ r: 3 }}
        />
      </LineChart>
    </div>
  );
}

export default CombinedEnergyChart;
