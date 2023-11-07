import React, { useState } from 'react';
import Correto from '../../../assets/Correto.svg';
import SendBu from './SendBu';

function Bu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className='w-[892px] h-[403px] border-2 border-blue-light rounded-2xl p-5 space-y-4'> 
      
      <div className='flex items-center justify-between'>
        <h1 className='text-blue text-base font-bold'>Boletim de Urna</h1>
        <div className='flex items-center'>
          {isModalOpen && <SendBu closeModal={closeModal} />}
          <button onClick={toggleModal} className="rounded-full bg-yellow px-2 h-[37px] w-[194px] font-bold ml-4">Enviar para o Monitor</button>
          <button onClick={toggleModal} className="rounded-full bg-yellow px-2 h-[37px] w-[102px] font-bold ml-4">Baixar Bu</button>
          <img src={Correto} className='h-[60px] w-[62.4px] ml-4' alt='Mascara' />
        </div>
      </div>

      <div className='space-y-4'>
        <h1 className='text-black text-base font-bold'>Identificação</h1>
        <div className='grid grid-cols-4 gap-x-8'>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Eleitores Aptos:</h1>
            <h1 className='text-blue-light text-xs font-bold'>12492</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Comparecimento:</h1>
            <h1 className='text-blue-light text-xs font-bold'>12222</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Eleitores Faltosos:</h1>
            <h1 className='text-blue-light text-xs font-bold'>190</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Habitados por ano de Nascimento:</h1>
            <h1 className='text-blue-light text-xs font-bold'>0.000</h1>
          </div>
        </div>

        <h1 className='text-black text-base font-bold'>Urna Eletrônica - Correspondência Efetivada</h1>
        <div className='grid grid-cols-4 gap-x-8'>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Tipo de Arquivo:</h1>
            <h1 className='text-blue-light text-xs font-bold'>Urna Eletrônica</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Código de Identificação:</h1>
            <h1 className='text-blue-light text-xs font-bold'>012312352331515120</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Data da Abertura UE:</h1>
            <h1 className='text-blue-light text-xs font-bold'>30/10/2022 08:00:01</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Data de fechamento UE:</h1>
            <h1 className='text-blue-light text-xs font-bold'>30/10/2022 17:01:22</h1>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-x-8'>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Código de identificacão da carga:</h1>
            <h1 className='text-blue-light text-xs font-bold'>220.344.551.362.368.805.077.296</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Código de identificacão MC</h1>
            <h1 className='text-blue-light text-xs font-bold'>04.A43.331</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Resumo da correspondência:</h1>
            <h1 className='text-blue-light text-xs font-bold'>077.296</h1>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Bu;
