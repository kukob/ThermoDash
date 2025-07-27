import RecommendationBox from "../components/RecommendationBox";
import HourlyRecommendationBox from "../components/HourlyRecommendationBox";
import "../styles/RecommendatioPage.css";


export default function RecommendationPage() {
  return (
    <>
    <div className="recommendation-page">
      <div className="recommendation-container">
        <RecommendationBox />
        <HourlyRecommendationBox />
      </div>
    </div>
    </>
  );
}
