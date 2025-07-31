import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";
import { getDailyProductionStats } from "../services/SolarService";

function DailyProductionChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDailyProductionStats()
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error("Greska pri ucitavanju podataka o proizvodnji:", err);
      });
  }, []);

  return (
    <div>
      <h3>Proizvodnja solarne energije po danima</h3>
      <LineChart width={700} height={350} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis label={{ value: "kWh", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="energyProduced"
          stroke="#82ca9d"
          name="Proizvodnja (kWh)"
        />
      </LineChart>
    </div>
  );
}

export default DailyProductionChart;
