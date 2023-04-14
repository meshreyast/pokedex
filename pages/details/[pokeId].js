/* eslint-disable @next/next/no-img-element */
import Evolution from '@/components/Evolution';
import fetcher from '@/utils/fetcher';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'

function PokemonDetails({ staticPokemons }) {

    const router = useRouter();
    let pokeId = router.query.pokeId;
    let firstIndex = Number(pokeId) - 1;
    let secondIndex = Number(pokeId);
    // console.log(firstIndex, secondIndex)

    const collections = [...staticPokemons];
    const pokemon = collections.slice(firstIndex, secondIndex)[0];

    const [show, setShow] = useState(false);

    return (
        <>
            <div className="w-full min-h-screen background">
                <div className="w-[95%] mx-auto flex justify-center items-center flex-col">
                    <div className="w-[50%] my-10 flex justify-center items-center text-xl md:text-3xl lg:text-6xl border-b-4 border-orange-400">
                        <h1>{pokemon.name}<span className='ml-6'>#{pokemon.number}</span></h1>
                    </div>
                    <div className="w-[90%] bg-white/20 flex justify-center items-center flex-col md:flex-row rounded-md">
                        <div className="w-[90%] mx-auto md:w-1/2 flex justify-center items-center">
                            <img className='rounded-md mt-10 mb-2 md:mb-10 md:pl-4 lg:pl-0' src={pokemon.image} alt={pokemon.name} />
                        </div>
                        <div className="w-[90%] md:w-1/2 md:px-8 py-4 text-sm md:text-xl lg:text-3xl">
                            <p className='mb-2 lg:mb-4'>{pokemon.classification}</p>
                            <div className="flex w-1/2 justify-between">
                                <p>Height</p>
                                <p>Weight</p>
                            </div>
                            <div className="flex w-1/2 justify-between">
                                <p>{pokemon.height.maximum}</p>
                                <p>{pokemon.weight.maximum}</p>
                            </div>
                            <p className='mt-2 lg:mt-4'>Type:</p>
                            <div className="flex w-1/2 justify-between">
                                {pokemon.types.map((type, id) => {
                                    return (
                                        <p key={id}>{type}</p>
                                    )
                                })}
                            </div>
                            <p className='mt-2 lg:mt-4'>Weakness: </p>
                            <div className="flex flex-wrap">
                                {pokemon.weaknesses.map((weakness, id) => {
                                    return (
                                        <p className='mr-4' key={id}>{weakness}</p>
                                    )
                                })}
                            </div>
                            <p className='mt-2 lg:mt-4'>Resistant to: </p>
                            <div className="flex flex-wrap">
                                {pokemon.resistant.map((res, id) => {
                                    return (
                                        <p className='mr-4' key={id}>{res}</p>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="w-[90%] flex justify-center items-center flex-col">
                        <button
                            className='bg-indigo-400 py-2 px-6 rounded-b-3xl'
                            onClick={() => setShow(!show)}
                        >
                            <div
                                className="flex justify-center items-center text-xl md:text-2xl"
                            >
                                <p>Evolutions</p>
                                {show ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                            </div>
                        </button>
                        <div className='w-full my-8 bg-white/20 flex justify-center items-center'>
                            {show &&
                                <Evolution pokemon={pokemon} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PokemonDetails

//Statically rendering all detail pages
export async function getStaticPaths() {

    const queries = gql`
    query pokemons {
        pokemons(first: 200) {
        number
        }
    }
    `
    const data = await fetcher(queries)
    const arr = data.pokemons.slice();

    const paths = arr.map(item => {
        return {
            params: {
                pokeId: `${item.number}`
            }
        }
    })

    return {
        paths: paths,
        fallback: false
    }
}

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
        resistant
        weaknesses
        weight{
            maximum
            }
        height{
            maximum
            }
        evolutions{
            id
            number
            name
            types
            image
        }
    }
}
    `
    const data = await fetcher(queries)

    return {
        props: {
            staticPokemons: data.pokemons.slice()
        },
    };
}