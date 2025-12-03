import { useEffect, useState } from "react";
import { getPokemons } from "../api/pokemonApi";
import { Navbar } from "../components/Navbar";
import { Pagination } from "../components/Pagination";

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string;
      };
    };
  };
}


export default function PokemonPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 12;
  const totalPages = Math.ceil(151 / limit); // até primeira geração → 151 pokémons

  async function load(page: number) {
    try {
      const offset = (page - 1) * limit;
      const data = await getPokemons(limit, offset);

      // busca os detalhes para pegar imagens
      const detailed = await Promise.all(
        data.results.map(async (p: any) => {
          const response = await fetch(p.url);
          return response.json();
        })
      );

      setPokemons(detailed);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    load(currentPage);
  }, [currentPage]);

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4 text-slate-700">
          Pokémon API
        </h1>

        {/* GRID */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pokemons.map((p: any) => (
            <div
              key={p.id}
              className="bg-white shadow p-4 rounded-xl text-center"
            >
              <img
                src={p.sprites.other["official-artwork"].front_default}
                alt={p.name}
                className="w-28 mx-auto"
              />

              <h2 className="text-lg capitalize font-semibold mt-2">{p.name}</h2>
              <p className="text-sm text-gray-500">ID: {p.id}</p>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
