import React, { useState,useEffect } from 'react';
import Correto from '../../../assets/Correto.svg';
import SendBu from './SendBu';
import { getBuById } from '../../../endpoints/bu.api';

function Bu(id) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  }
  // useEffect(() => {
  //   const fetchBu = async () => {
  //     const res = await getBuById(id);
  //     console.log(res);
  //   };

  //   fetchBu();
  // }, []);

  return (
    <div className="flex items-center justify-center">
      <div className='w-[80vw] md2:w-[892px] md2:h-[403px] justify-center border-2 border-blue-light rounded-2xl p-5 space-y-4'> 

        <div className='flex flex-col items-center gap-[20px] md2:flex-row md2:items-center md2:justify-between'>
          <h1 className='text-blue text-base font-bold'>Boletim de Urna</h1>
          <div className='flex items-center md2:flex-row flex-col gap-6'>
          {isModalOpen && <SendBu closeModal={closeModal} />}
          <button onClick={toggleModal} className="rounded-full bg-yellow px-2 h-[37px] w-[194px] font-bold ml-4 hidden md2:block">Enviar para o Monitor</button>
          <button onClick={toggleModal} className="rounded-full bg-yellow px-2 h-[37px] w-[102px] font-bold ml-4">Baixar Bu</button>
          <img src={Correto} className='h-[60px] w-[62.4px] ml-4' alt='Mascara' />
        </div>
        </div>

        <div className='space-y-4'>
          <div className='grid md2:grid-cols-4 grid-cols-2 gap-x-8 gap-y-4'>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Município:</h1>
              <h1 className='text-blue-light text-xs font-bold'>71072</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Zona Eleitoral:</h1>
              <h1 className='text-blue-light text-xs font-bold'>0001</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Seção Eleitoral:</h1>
              <h1 className='text-blue-light text-xs font-bold'>0003</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Local de votação:</h1>
              <h1 className='text-blue-light text-xs font-bold'>1015</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Eleitores aptos:</h1>
              <h1 className='text-blue-light text-xs font-bold'>264</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Comparecimento:</h1>
              <h1 className='text-blue-light text-xs font-bold'>186</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Eleitores faltosos:</h1>
              <h1 className='text-blue-light text-xs font-bold'>78</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Habitados por ano de nascimento:</h1>
              <h1 className='text-blue-light text-xs font-bold'>16</h1>
            </div>
          </div>

          <h1 className='text-black text-base font-bold'>Urna Eletrônica - Correspondência Efetivada</h1>
          <div className='grid md2:grid-cols-4 grid-cols-2 gap-x-8 gap-y-4'>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Tipo de Arquivo:</h1>
              <h1 className='text-blue-light text-xs font-bold'>Urna Eletrônica</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Código de Identificação UE:</h1>
              <h1 className='text-blue-light text-xs font-bold'>2031645</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Data da Abertura UE:</h1>
              <h1 className='text-blue-light text-xs font-bold'>30/10/2022 08:00:01</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Data de Fechamento UE:</h1>
              <h1 className='text-blue-light text-xs font-bold'>30/10/2022 17:01:22</h1>
            </div>
          </div>

          <div className='sm:grid sm:grid-cols-4 grid-cols-2 gap-x-8 gap-y-4'>
            <div className='sm:col-span-2 space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Código de identificação da carga:</h1>
              <h1 className='text-blue-light text-xs font-bold break-all'>220.344.551.362.368.805.077.296</h1>
            </div>
            <div className='sm:col-span-1 space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Código de identificação MC:</h1>
              <h1 className='text-blue-light text-xs font-bold'>04.A43.331</h1>
            </div>
            <div className='sm:col-span-1 space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Resumo da correspondência:</h1>
              <h1 className='text-blue-light text-xs font-bold'>077.296</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bu;
