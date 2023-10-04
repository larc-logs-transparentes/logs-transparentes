import React, { useState } from 'react';
import Mascara from '../../../assets/Mascara.svg';
import Dados from '../../../assets/Dados.svg';
import Monitor from '../../../assets/Monitor.svg';
import Verificacao from '../../../assets/Verificacao.svg';

function Header() {
  return (
    <div className='overflow-hidden'>
      <div className='font-sans z-10'>
        <div className='h-full text-center font-bold flex items-center justify-center relative'>
          <img src={Mascara} className='absolute top-0 right-0 z-0' alt='Mascara' />
          <h1 className='text-white text-3xl p-8 z-20 relative'>
            Armazenamento Transparente de Dados da Eleição
          </h1>
          <div className='bg-blue h-[105px] w-full absolute top-0 left-0 z-10 opacity-70'></div>
        </div>
      </div>
      <h1 className='text-center text-2xl p-8 z-20 relative font-sans font-bold'>
        Como Funciona
      </h1>
      <div className='flex justify-center p-[60px] gap-[200px]'>
        <div className='flex flex-col items-center w-[250px]'>
          <img src={Dados} alt='Monitor' />
          <h2 className='text-blue text-center font-sans font-bold text-xl mt-[30px]'> Dados </h2>
          <h4 className='text-black text-center font-sans font-bold text-base'>Armazenamos os dados da eleição com Logs Transparentes, uma árvore de dados que detecta qualquer manipulação</h4>
        </div>                                              
        <div className='flex flex-col items-center w-[250px]'>
          <img src={Verificacao} alt='Monitor' />
          <h2 className='text-blue text-center font-sans font-bold text-xl mt-[30px]'> Verificação </h2>
          <h4 className='text-black text-center font-sans font-bold text-base'>Os eleitores verificam se as informações armazenadas estão corretas. Os monitores verificam se nenhuma informação foi removida</h4>
        </div>                                              
        <div className='flex flex-col items-center w-[250px]'>
          <img src={Monitor} alt='Monitor' />
          <h2 className='text-blue text-center font-sans font-bold text-xl mt-[30px]'> Monitor </h2>
          <h4 className='text-black text-center font-sans font-bold text-base'>Você pode escolher qualquer monitor de preferência para enviar as suas verificações</h4>
        </div>                                              
      </div>
    </div>
  );
}

export default Header;
