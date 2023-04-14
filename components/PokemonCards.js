/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

const PokemonCards = ({ pokemon }) => {

    return (
        <>
            <div className="flex justify-center items-center ">
                <div className="w-[80%] h-full flex flex-col justify-center items-center bg-white border-4 border-indigo-400 rounded-md mx-auto hover:scale-105 transition-all duration-500 ease-in-out">
                    <Link href={`/details/${pokemon.number}`}>
                        <div className="w-full h-full">
                            <img className='w-full h-full' src={pokemon.image} alt={pokemon.name} />
                        </div>
                    </Link>
                    <div className="w-full h-full px-4 flex justify-start flex-col relative">
                        <div className="absolute bottom-0">
                            <p className='inline py-1 px-2 mb-2 text-xl lg:text-3xl bg-lime-200/50 text-rose-500'>#{pokemon.number}</p>
                            <p className='text-[#070707] text-xl lg:text-3xl'>{pokemon.name}</p>
                            <div className="w-[60%] my-2 flex flex-row text-white text-md lg:text-xl">
                                {pokemon.types.map((type, id) => {
                                    return (
                                        <p className='gradient text-black rounded-md py-2 px-4 mr-2' key={id}>{type}</p>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PokemonCards