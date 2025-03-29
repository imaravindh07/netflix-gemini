import React from 'react'

export const VedioTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video py-36 pt-[10%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
        <p className='hidden md:inline-block text-lg  py-6 w-1/4'>{overview}</p>
        <div>
            <button className='bg-white text-black py-1 md:py-4 md:px-12 px-3 rounded-lg text-xl md:mt-0 my-4 hover:bg-opacity-80'>
                ▶Play</button>
            <button className='hidden md:inline-block mx-2 bg-gray-500 text-white p-4 px-12 rounded-lg text-xl bg-opacity-50'>
                More Info</button>
        </div>
    </div>
  )
}
