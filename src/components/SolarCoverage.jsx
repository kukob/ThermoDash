import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getUsageSummaryStats } from "../services/UsageService";
import { getProductionStats } from "../services/SolarService";

const COLORS = ["#82ca9d", "#8884d8"]; 

function SolarCoverage() {
  const [coverageData, setCoverageData] = useState([]);

  useEffect(() => {
    Promise.all([getUsageSummaryStats(), getProductionStats()])
      .then(([usageRes, prodRes]) => {
        const usage = usageRes.data;
        const production = prodRes.data;

        const consumed = usage["monthly"];
        const produced = production["monthly"];

        const covered = Math.min((produced / consumed) * 100, 100);
        const uncovered = 100 - covered;

        setCoverageData([
          { name: "Pokriveno", value: covered },
          { name: "Nepokriveno", value: uncovered },
        ]);
      })
      .catch((err) => {
        console.error("Greska pri ucitavanju:", err);
      });
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      
      <PieChart width={400} height={300}>
        <Pie
          data={coverageData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {coverageData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
        <Legend />
      </PieChart>
    </div>
  );
}

export default SolarCoverage;
