import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { getConsumptionByDevice } from "../services/UsageService";
import axios from "axios";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

function DevicePieChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     getConsumptionByDevice()
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error("Greška pri učitavanju podataka za pie chart:", error);
    })
    .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h3>📊 Udeo klime i grejanja u ukupnoj potrošnji</h3>

      {loading ? (
        <p>Učitavanje...</p>
      ) : data.length === 0 ? (
        <p>Nema podataka za prikaz.</p>
      ) : (
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="totalConsumption"
            nameKey="deviceType"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      )}
    </div>
  );
}

export default DevicePieChart;
