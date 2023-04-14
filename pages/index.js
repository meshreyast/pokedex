import Pagination from "@/components/Pagination";
import PokemonCards from "@/components/PokemonCards";
import fetcher from "@/utils/fetcher";
import { gql } from "@apollo/client"
import { useEffect, useState } from "react";

function Home({ pokemons }) {

    const [pokes, setPokes] = useState([]);
    const collections = [...pokemons, ...pokes];

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(20);

    const lastCardIndex = currentPage * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const currentPokemons = collections.slice(firstCardIndex, lastCardIndex);

    //Fetching in real time
    useEffect(() => {
        fetcher(gql`
        query pokemons {
            pokemons(first: 200) {
            id
            number
            name
            classification
            types
            image
        }
    }
    `).then(data => setPokes(data.pokemons.slice(60, 151)))
    }, [])

    return (
        <>
            <div className="w-full min-h-screen bg-[#151515] flex flex-col justify-center items-center">
                <h1 className="text-3xl lg:text-6xl my-10 px-10 py-4 lg:px-16 lg:py-10 rounded-2xl gradient ">Pokédex</h1>
                <div className="w-[95%] rounded-xl mx-auto py-10 bg-white/10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {currentPokemons.map((pokemon, id) => {
                        return (
                            <PokemonCards key={id} pokemon={pokemon} collections={collections} />
                        )
                    })}
                </div>
                <Pagination
                    totalCards={collections.length}
                    cardsPerPage={cardsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage} />
            </div>
        </>
    );
}

export default Home;

//Fetching in build time
export async function getStaticProps() {

    const queries = gql`
    query pokemons {
        pokemons(first: 200) {
        id
        number
        name
        classification
        types
        image
        }
    }
    `
    const data = await fetcher(queries)

    return {
        props: {
            pokemons: data.pokemons.slice(0, 60),
        },
    };
}