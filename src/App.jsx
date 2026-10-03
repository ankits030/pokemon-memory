import { useState } from "react";
import { usePokemonCards } from "./hooks/usePokemonCards";
import cardGrid from "./components/cardGrid";
import ScoreCard from "./components/ScoreCard";
import "./App.css";

export default function App() {
  const { cards, loading, error, reshuffle } = usePokemonCards();
  const [clickedIds, setClickedIds] = useState(new Set());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [message, setMessage] = useState("Click any card to start!");

  function handleCardClick(id) {
    if (clickedIds.has(id)) {
      setBestScore((prev) => Math.max(prev, score));
      setMessage(`Game over! You scored ${score}.`);
      setClickedIds(new Set());
      setScore(0);
      reshuffle();
      return;
    }

    const nextClicked = new Set(clickedIds).add(id);
    const nextScore = score + 1;

    if (nextClicked.size === cards.length) {
      setBestScore((prev) => Math.max(prev, nextScore));
      setMessage(`You cleared the board! Final score: ${nextScore}.`);
      setClickedIds(new Set());
      setScore(0);
      reshuffle();
      return;
    }

    setClickedIds(nextClicked);
    setScore(nextScore);
    setMessage("Nice! Don't click the same one twice.");
    reshuffle();
  }

  return (
    <div className="app">
      <h1>Poké Memory</h1>
      <Scoreboard score={score} bestScore={bestScore} />
      <p className="message">{message}</p>
      {loading && <p>Loading Pokémon…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <CardGrid cards={cards} onCardClick={handleCardClick} />}
    </div>
  );
}