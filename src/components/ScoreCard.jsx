export default function Scoreboard({ score, bestScore }) {
  return (
    <div className="scoreboard">
      <div className="score-box">
        <p className="score-label">SCORE</p>
        <p className="score-value">{String(score).padStart(2, "0")}</p>
      </div>
      <div className="score-box">
        <p className="score-label">BEST</p>
        <p className="score-value">{String(bestScore).padStart(2, "0")}</p>
      </div>
    </div>
  );
}