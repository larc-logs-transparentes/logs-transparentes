import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
        <div className='w-[892px] h-[403px] border-2 border-blue-light rounded-2xl '> 
        
            <div className='mt-[34px] ml-[24px]'>
                <div className='flex'>
                <h1 className='text-blue text-base font-bold p-[5px]'>Boletim de Urna</h1>
                {isModalOpen && <SendBu closeModal={closeModal} />}
                    <button onClick={toggleModal} className="rounded-full bg-yellow px-2 h-[37px] w-[194px] ml-[256px] font-bold">Enviar para o Monitor</button>
                    <button onClick={toggleModal} className="rounded-full bg-yellow px-2 h-[37px] w-[102px] ml-[16px] font-bold">Baixar Bu</button>
                <img src={Correto} className='h-[60px] w-[62.4px] ml-[32px]' alt='Mascara' />
            </div>
            <h1 className='text-black text-base font-bold p-[5px]'>Identificação</h1>
            <div className='flex gap-[100px]'>
                    <div className='flex-col'>
                        <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Eleitores Aptos:</h1>
                        <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>12492</h1>
                    </div>  
                    <div className='flex-col'>
                        <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Comparecimento:</h1>
                        <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>12222</h1>
                    </div>  
                    <div className='flex-col'>
                        <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Eleitores Faltosos:</h1>
                        <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>190</h1>
                    </div>  
                    <div className='flex-col'>
                        <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Habitados por ano de Nascimento:</h1>
                        <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>0.000</h1>
                    </div>  
                </div>
                <h1 className='text-black text-base font-bold p-[5px] truncate'>Urna Eletrônica - Correspondência Efetivada</h1>
                <div className='flex gap-[100px]'>
                    <div className='flex-col'>
                        <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Tipo de Arquivo:</h1>
                        <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>Urna Eletrônica</h1>
                    </div> 
                    <div className='flex-col'>
                        <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Código de Identificação:</h1>
                        <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>012312352331515120</h1>
                    </div>  
                    <div className='flex-col'>
                        <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Data da Abertura UE:</h1>
                        <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>30/10/2022 08:00:01</h1>
                    </div>  
                    <div className='flex-col'>
                        <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Data de fechamento UE:</h1>
                        <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>30/10/2022 17:01:22</h1>
                    </div>  
                </div>
                <div className='flex gap-[100px]'>
                    <div className='flex-col'>
                        <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Código de identificacão da carga:</h1>
                        <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>220.344.551.362.368.805.077.296</h1>
                    </div>  
                    <div className='flex-col '>
                        <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Código de identificacão MC</h1>
                        <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>04.A43.331</h1>
                    </div>  
                    <div className='flex-col'>
                        <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Resumo da correspondência:</h1>
                        <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>077.296</h1>
                    </div>  
                </div>
        </div>
    </div>
  );
}

export default Bu;
