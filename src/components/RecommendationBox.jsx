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
    <div style={{ padding: "1rem", background: "#d4f3dbff", marginTop: "1rem" }}>
      <h3>Vremenska preporuka</h3>
      <p>{recommendation}</p>
    </div>
  );
}

export default RecommendationBox;
