import { useState, useEffect, useCallback } from "react";

const POKEDEX_SIZE = 151;
const CARD_COUNT = 8;

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getRandomIds(count, max) {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * max) + 1);
  }
  return [...ids];
}

export function usePokemonCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const ids = getRandomIds(CARD_COUNT, POKEDEX_SIZE);
      const results = await Promise.all(
        ids.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
        )
      );
      const formatted = results.map((p) => ({
        id: p.id,
        name: p.name,
        image: p.sprites.other["official-artwork"].front_default || p.sprites.front_default,
        type: p.types[0]?.type?.name || "normal",
      }));
      setCards(shuffle(formatted));
    } catch (err) {
      setError("Couldn't reach PokeAPI. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCards();
  }, [loadCards]);


  const reshuffle = useCallback(() => {
    setCards((prev) => shuffle(prev));
  }, []);

  return { cards, loading, error, reshuffle };
}