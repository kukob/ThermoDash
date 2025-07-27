import UsageStats from "../components/UsageStats";
import DailyLineChart from "../components/DailyLineChart";
import DevicePieChart from "../components/DevicePieChart";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const slides = [
  { component: <UsageStats />, label: "Statistika" },
  { component: <DailyLineChart />, label: "Linijski grafikon" },
  { component: <DevicePieChart />, label: "Udeo uredjaja" },

];

export default function StatsPage() {
    // <nav style={{ marginBottom: "1rem" }}>
    //     <NavLink to="stats" style={{ marginRight: "10px" }}>📊 Statistika</NavLink>
    //     <NavLink to="input" style={{ marginRight: "10px" }}>✍️ Unos podataka</NavLink>
    //     <NavLink to="recommendations">💡 Preporuke</NavLink>
    //   </nav>

    const [currentSlide, setCurrentSlide] = useState(0);
    
    const next = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    // <>
    //   <UsageStats />
    //   <DailyLineChart />
    //   <DevicePieChart />
    // </>
    <div>
     <div style={{ padding: "1rem", marginBottom: "1rem" }}>
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
