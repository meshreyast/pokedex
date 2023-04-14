/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Evolution = ({ pokemon }) => {
    return (
        <div className='w-[90%] flex justify-center items-center mx-auto flex-col md:flex-row flex-wrap gap-8 my-10 relative'>
            {pokemon.evolutions === null ? (
                <div className='w-1/2 flex justify-center items-center mx-auto'>
                    <p className='text-xl md:text-2xl'>No Evolutions</p>
                </div>
            ) : (
                <>
                    {pokemon.evolutions.map((evo, id) => {
                        return (
                            <div key={id} className='h-full'>
                                <div className="w-full h-full">
                                    <img className='w-full h-full border-4 border-indigo-400' src={evo.image} alt={evo.name} />
                                </div>
                                <p className='text-xl md:text-2xl'>#{evo.number}</p>
                                <p className='text-xl md:text-2xl'>{evo.name}</p>
                                <div className="w-full my-2 flex flex-row text-md lg:text-xl">
                                    {pokemon.types.map((type, id) => {
                                        return (
                                            <p className='gradient text-black rounded-md py-2 px-4 mr-2' key={id}>{type}</p>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default Evolution