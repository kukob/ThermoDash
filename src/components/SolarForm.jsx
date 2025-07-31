import { useState } from "react";
import axios from "axios";
import "../styles/UsageForm.css";
import { submitSolarPanel } from "../services/SolarService";

function SolarPanelForm() {
  const [formData, setFormData] = useState({
    panelPowerKw: "",
    installationDate: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.panelPowerKw || !formData.installationDate) {
      setMessage("Sva polja su obavezna.");
      return;
    }

    try {
        await submitSolarPanel({
        ...formData,
        panelPowerKw: parseFloat(formData.panelPowerKw)
      });

      setMessage("Solarni panel uspesno dodat!");
      setFormData({
        panelPowerKw: "",
        installationDate: ""
      });
    } catch (err) {
      console.error("Greska:", err);
      setMessage("Greska: " + (err.response?.data || "Neuspesno slanje."));
    }
  };

  return (
    <div className="usage-form-container">
      <h2>Dodavanje solarnog panela</h2>

      <form onSubmit={handleSubmit}>
        <label>Snaga panela (kW):</label>
        <input
          type="number"
          name="panelPowerKw"
          value={formData.panelPowerKw}
          onChange={handleChange}
          required
          step="0.01"
        />

        <label>Datum instalacije:</label>
        <input
          type="date"
          name="installationDate"
          value={formData.installationDate}
          onChange={handleChange}
          required
        />

        <button type="submit" style={{ backgroundColor: "#4CAF50" }}>
          Posalji
        </button>
      </form>

      {message && <p style={{ marginTop: "1rem", color: "green" }}>{message}</p>}
    </div>
  );
}

export default SolarPanelForm;
