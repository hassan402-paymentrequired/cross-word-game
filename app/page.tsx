import React from 'react'
import Crossword from './components/Crossword';

const page = () => {
  const words = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'
];



  return (
      <div className='flex bg-black min-h-screen items-center justify-center relative w-full flex-col p-10'>
          <h1 className='text-4xl text-white font-bold'>Crossword Game</h1>
          <Crossword words={words} />
      </div>
  );
}

export default page