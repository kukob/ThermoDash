import { Outlet, NavLink } from "react-router-dom";
import '../styles/DashLayout.css';

export default function DashLayout({onLogout}) {
//   return (

//     <div className="dash-layout">
        
//       <h1>ThermoDash</h1>
//       <button onClick={onLogout} style={{ float: "right", margin: "1rem" }}>
//         Odjavi se
//       </button>

//       <nav className="dash-layout__nav-links">
//         <NavLink to="stats" style={{ marginRight: "10px" }}>📊 Statistika</NavLink>
//         <NavLink to="input" style={{ marginRight: "10px" }}>✍️ Unos podataka</NavLink>
//         <NavLink to="recommendations">💡 Preporuke</NavLink>
//       </nav>

//       <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
//         <Outlet />
//       </div>
//     </div>
//   );

return (
    <div className="dash-layout">
      
      <nav className="dash-layout__nav">
        <div>
          <h1>ThermoDash</h1>
          <div className="dash-layout__nav-links">
            <NavLink 
              to="stats" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Potrosnja energije
            </NavLink>
            <NavLink 
              to="stats_solar" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Proizvodnja energije
            </NavLink>
            <NavLink 
              to="input" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Unos potrosnje
            </NavLink>
            <NavLink 
              to="solar" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Unos solarnog panela
            </NavLink>
                        <NavLink 
              to="recommendations" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Preporuke
            </NavLink>
   
            
          </div>
        </div>

        <button 
          onClick={onLogout} 
          className="dash-layout__logout-button">
          Odjavi se
        </button>
      </nav>

      <main className="dash-layout__main">
        <Outlet />
      </main>

    </div>
  );
}
