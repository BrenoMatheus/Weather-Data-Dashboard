// src/api/pokemonApi.ts

// Busca lista de Pokémons com paginação
export async function getPokemons(limit = 20, offset = 0) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) throw new Error("Erro ao buscar Pokémon");

  return response.json(); // contém: count, next, previous, results[]
}

// Buscar Pokémon individual pelo nome
export async function getPokemonByName(name: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (!response.ok) throw new Error("Pokémon não encontrado");

  return response.json();
}
