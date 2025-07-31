import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentRecommendation } from "../services/RecommendationService";


function RecommendationBox() {
  const [recommendation, setRecommendation] = useState("");

  useEffect(() => {
    getCurrentRecommendation()
      .then((res) => setRecommendation(res.data))
      .catch((err) => console.error("Greska u preporuci:", err));
  }, []);

  return (
    <div style={{ padding: "1rem", background: "#d4f3dbff", marginTop: "1rem",    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', sans-serif",  fontSize: "1.03rem", textAlign: "center",}}>
      <h3>Trenutna vremenska preporuka:</h3>
      <p>{recommendation}</p>
    </div>
  );
}

export default RecommendationBox;
