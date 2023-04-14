import React from 'react'

const Pagination = ({ totalCards, cardsPerPage, setCurrentPage, currentPage }) => {

    let pages = [];

    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='flex flex-wrap justify-center my-8 lg:my-16'>
            {
                pages.map((page, id) => {
                    return (
                        <button
                            key={id}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 lg:w-16 lg:h-16 text-xl lg:text-4xl text-white hover:bg-[#ffe400] hover:text-[#101010] mx-2 rounded-md cursor-pointer bg-transparent ${page === currentPage ? 'active' : ''}`}
                        >
                            {page}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default Pagination