import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { getConsumptionByDevice } from "../services/UsageService";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

const PRICE_PER_KWH = 10;

function MonthlyChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConsumptionByDevice()
      .then((response) => {
        const dataInDinars = response.data.map(item => ({
          ...item,
          totalConsumption: item.totalConsumption * PRICE_PER_KWH,
        }));
        setData(dataInDinars);
      })
      .catch((error) => {
        console.error("Greska pri ucitavanju podataka za pie chart:", error);
      })
      .finally(() => setLoading(false));
  }, []);


  const renderLabel = (entry) => {
    return `${entry.deviceType}: ${entry.totalConsumption.toLocaleString()} din`;
  };

  return (
    <div>
      <h3>Mesecna potrosnja u dinarima za ovaj mesec</h3>

      {loading ? (
        <p>Ucitavanje</p>
      ) : data.length === 0 ? (
        <p>Nema podataka za prikaz</p>
      ) : (
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="totalConsumption"
            nameKey="deviceType"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={renderLabel}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend formatter={(value) => `${value}`} />
          <Tooltip formatter={(value) => `${value.toLocaleString()} din`} />
        </PieChart>
      )}
    </div>
  );
}

export default MonthlyChart;
