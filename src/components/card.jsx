export default function Card({ pokemon, onClick }) {
  return (
    <button className="card" onClick={() => onClick(pokemon.id)}>
      <img src={pokemon.image} alt={pokemon.name} className="card-image" />
      <span className="card-name">{pokemon.name}</span>
      <span className="card-type">{pokemon.type}</span>
    </button>
  );
}