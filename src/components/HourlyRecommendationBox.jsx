import React, { useEffect, useState } from "react";
import axios from "axios";
import { getHourlyRecommendations } from "../services/RecommendationService";

function HourlyRecommendationBox() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  useEffect(() => {
     getHourlyRecommendations()
      .then((res) => {
        setRecommendations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Nema preporuka ili korisnik nema podesen grad.");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", margin: "1rem 0", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>



      <h3>Preporuke za naredni period</h3>
      {loading ? (
        <p>Ucitavanje preporuka...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : recommendations.length === 0 ? (
        <p>Nema preporuka za prikaz.</p>
      ) : (
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index}>
              <strong>{rec.timeRange}</strong>: {rec.recommendation}
            </li>
          ))}
        </ul>
      )}





    </div>

  );
}

export default HourlyRecommendationBox;
