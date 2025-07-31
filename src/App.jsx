import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import { getAllDevices } from './services/DeviceService'; 
import RegisterForm from './components/RegisterForm';
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/DashLayout";
import StatsPage from "./pages/StatsPage";
import InputPage from "./pages/InputPage";
import InputSolarPage from "./pages/InputSolarPage"
import RecommendationsPage from "./pages/RecommendationPage";
import StatsSolarPage from './pages/StatsSolarPage';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("isLoggedIn") === "true";
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
  };

  const [showLogin, setShowLogin] = useState(true);

  return (
    
    <Router>

      {/* <div className="background" /> */}
      <div className="App">
        <Routes>

          
          <Route
            path="/"
            element={
              !isLoggedIn ? (     
                <div className="form-wrapper"> 
                 <div className="form-left">
                <>
                  {/* <h1>{showLogin ? "Prijava" : "Registracija"}</h1> */}
                  
                  <h1>ThermoDash</h1>

                  {showLogin ? (
                    <LoginForm onLogin={handleLogin} />
                  ) : (
                    <RegisterForm />
                  )}

                  <p>
                    {/* {showLogin ? "Nemate nalog?" : "Već imate nalog?"} */}
                    <button
                      onClick={() => setShowLogin(!showLogin)}
                      style={{ marginLeft: "10px" }}
                    >
                      {showLogin ? "Registruj se" : "Prijavi se"}
                    </button>
                    
                  </p>
                  
                </>
                </div>
                  <div className="form-right">
                    <img src="/energy.jpeg" alt="Background" />
                  </div>
                </div>    

                
              ) : (
                <Navigate to="/dashboard" /> 
              )
            }
          />

         
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />  
              )
            }
          >
            <Route index element={<StatsPage />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="input" element={<InputPage />} />
            <Route path="recommendations" element={<RecommendationsPage />} />
            <Route path="solar" element={<InputSolarPage />} />
            <Route path="stats_solar" element={<StatsSolarPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App
