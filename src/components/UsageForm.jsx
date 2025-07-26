import { useEffect, useState } from "react";
import axios from "axios";
import { getAllDevices } from '../services/DeviceService';
import { submitUsage } from '../services/UsageService';


function UsageForm() {
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [formData, setFormData] = useState({
    deviceTypeId: "",
    date: "",
    usageHours: "",
    note: ""
  });

  const [message, setMessage] = useState("");


  useEffect(() => {
    getAllDevices()
      .then((res) => setDeviceTypes(res.data))
      .catch((err) => console.error("Greška pri učitavanju uređaja:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.deviceTypeId || !formData.date || !formData.usageHours) {
      setMessage("Sva polja osim napomene su obavezna.");
      return;
    }

    try {
      await submitUsage({
        ...formData,
        usageHours: parseInt(formData.usageHours),
      });

      setMessage("Uspešno poslato!");
      setFormData({
        deviceTypeId: "",
        date: "",
        usageHours: "",
        note: ""
      });
    } catch (err) {
      console.error("Greška:", err);
      setMessage("Greška: " + (err.response?.data || "Neuspešno"));
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Unos potrošnje uređaja</h2>

      <form onSubmit={handleSubmit}>
        <label>Uređaj:</label>
        <select
          name="deviceTypeId"
          value={formData.deviceTypeId}
          onChange={handleChange}
          required
        >
          <option value="">-- Izaberi uređaj --</option>
          {deviceTypes.map(device => (
            <option key={device.id} value={device.id}>{device.name}</option>
          ))}
        </select>

        <label>Datum korišćenja:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label>Broj sati korišćenja:</label>
        <input
          type="number"
          name="usageHours"
          value={formData.usageHours}
          onChange={handleChange}
          required
        />

        <label>Napomena:</label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
        />

        <button type="submit">Pošalji</button>
      </form>

      {message && <p style={{ marginTop: "1rem", color: "green" }}>{message}</p>}
    </div>
  );
}

export default UsageForm;
