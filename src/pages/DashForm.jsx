
import UsageForm from "../components/UsageForm";
import UsageStats from "../components/UsageStats";
import DailyLineChart from "../components/DailyLineChart";
import DevicePieChart from "../components/DevicePieChart";
import UsageDailyDeviceChart from "../components/UsageDailyDeviceChart";
import RecommendationBox from "../components/RecommendationBox";
import HourlyRecommendationBox from "../components/HourlyRecommendationBox";
import axios from "axios";
import React, { useState, useEffect } from "react";


const slides = [
  { component: <UsageStats />, label: "Statistika" },
  { component: <DailyLineChart />, label: "Linijski grafikon" },
  { component: <DevicePieChart />, label: "Udeo uređaja" },

];

function Dashboard({}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div>
      <h1>Thermo Dash!</h1>

      <div style={{ margin: "1rem 0", padding: "1rem", border: "1px dashed #aaa" }}>
        <RecommendationBox />
        <HourlyRecommendationBox />
      </div>

      
      <div >
        <h2>Unos potrošnje</h2>
        <UsageForm />
      </div>

     
      <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
        <h2>{slides[currentSlide].label}</h2>
        {slides[currentSlide].component}
      </div>

      <div>
        <button onClick={prev}>⬅️ Nazad</button>
        <button onClick={next} style={{ marginLeft: "10px" }}>
          Dalje ➡️
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

