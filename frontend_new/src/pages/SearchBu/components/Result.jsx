import React from 'react';

function Result() {
  return (
    <div className="flex items-center justify-center">
      <div className='w-[80vw] md2:w-[892px] md2:h-[403px] justify-center border-2 border-blue-light rounded-2xl p-5 space-y-4'> 

        <h1 className='text-black text-lg font-bold'>Eleição 547</h1>
        <h2 className='text-black text-xl font-bold mb-4'>Governador</h2>

        <div className='grid md2:grid-cols-4 grid-cols-2 gap-x-8 gap-y-4'>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Candidato 1</h1>
            <h1 className='text-blue-light text-xs font-bold'>10</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Votação</h1>
            <h1 className='text-blue-light text-xs font-bold'>99</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Candidato 2</h1>
            <h1 className='text-blue-light text-xs font-bold'>13</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Votação</h1>
            <h1 className='text-blue-light text-xs font-bold'>78</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Eleitores Aptos</h1>
            <h1 className='text-blue-light text-xs font-bold'>264</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Comparecimento</h1>
            <h1 className='text-blue-light text-xs font-bold'>186</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Votos nominais</h1>
            <h1 className='text-blue-light text-xs font-bold'>177</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Votos de legenda</h1>
            <h1 className='text-blue-light text-xs font-bold'>0</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Votos em branco</h1>
            <h1 className='text-blue-light text-xs font-bold'>2</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Votos nulos</h1>
            <h1 className='text-blue-light text-xs font-bold'>7</h1>
          </div>
        </div>

        <div className='space-y-2'>
          <h1 className='text-gray text-xs font-bold'>Total apurado</h1>
          <h1 className='text-blue-light text-xs font-bold'>186</h1>
        </div>

      </div>
    </div>
  );
}

export default Result;
