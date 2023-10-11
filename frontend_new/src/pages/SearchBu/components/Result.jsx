import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Correto from '../../../assets/Correto.svg';

function Result() {

  return (
    <div className='w-[892px] h-[403px] border-2 border-blue-light rounded-2xl '> 
        <div className='mt-[34px] ml-[24px]'>
            <h1 className='text-black text-base font-bold p-[5px] truncate'>Eleição N°</h1>
            <h1 className='text-blue text-xl font-bold p-[5px] truncate'>Governador</h1>
                <div className='flex gap-[100px]'>
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Candidato 1:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>0.000</h1>
                
                </div>  
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Votação:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>0.000</h1>
                </div>  
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Candidato 2:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>0.000</h1>
                </div>  
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Votação:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>0.000</h1>
                </div>  
            </div>
            <div className='flex gap-[100px] mt-[20px]'>
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Eleitores aptos:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>0.000</h1>
                
                </div> 
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Comparecimento:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>0.000</h1>
                </div>  
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Votos Nominais:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>0.000</h1>
                </div>  
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Votos de Legenda:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>0000000</h1>
                </div>  
            </div>
            <div className='flex gap-[100px] mt-[20px]'>
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Votos em Branco:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>0.000</h1>
                
                </div>  
                <div className='flex-col '>
                    <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Votos Nulos:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>0.0000000000000000000000000</h1>
                </div>  

                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px] truncate'>Total Apurado:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px] truncate'>0.000</h1>
                </div>  
            </div>
        </div>
    </div>
  );
}

export default Result;
