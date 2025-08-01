import UsageStats from "../components/UsageStats";
import DailyLineChart from "../components/DailyLineChart";
import DevicePieChart from "../components/DevicePieChart";
import UsageRSD from "../components/UsageRSD";
import DailyProductionChart from "../components/DailyProductionChart";
import SolarStats  from "../components/SolarStats";
import StatsCombined from "../components/StatsCombined";
import CombinedEnergyChart from "../components/CombinedChart";
import CombinedRSD from "../components/CombinedRSD";
import SolarCoverage from "../components/SolarCoverage";
import MonthlyChart from "../components/MonthlyChart";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../styles/StatsPage.css";

const slides = [
  // { component: <UsageStats />, label: "Statistika" },
  // { component: <SolarStats />, label: "Statistika solarne ene" },
  { component: <StatsCombined />, label: "Potrosnja energije za ovu nedelju mesec i godinu" },
//   { component: <DailyLineChart />, label: "Linijski grafikon" },
//   { component: <DailyProductionChart />, label: "Proizvodnja energije " },
  { component: <CombinedEnergyChart />, label: "Proizvodnja energije dnevno " },
  // { component: <UsageRSD />, label: "Potrosnja u RSD" },
  { component: <CombinedRSD />, label: "Proizvodnja u RSD" },
  { component: <SolarCoverage />, label: "Procenat potrosnje prekriven solarno" },
  



  
];

export default function StatsSolarPage() {
    // <nav style={{ marginBottom: "1rem" }}>
    //     <NavLink to="stats" style={{ marginRight: "10px" }}>Statistika</NavLink>
    //     <NavLink to="input" style={{ marginRight: "10px" }}>Unos podataka</NavLink>
    //     <NavLink to="recommendations">Preporuke</NavLink>
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
    <div className="stats-page">
      <div className="stats-page__container">
        <h2 className="stats-page__title">{slides[currentSlide].label}</h2>
         <div className="stats-page__content">
          {slides[currentSlide].component}
        </div>
      </div>

      <div className="stats-page__buttons">
        <button onClick={prev} className="stats-page__button" > Nazad</button>
        <button onClick={next} className="stats-page__button" >Dalje </button>
      </div>
    </div>


  );
}
