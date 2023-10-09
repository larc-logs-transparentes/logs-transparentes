import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Correto from '../../../assets/Correto.svg';

function Result() {

  return (
    <div className='w-[892px] h-[403px] border-2 border-blue-light rounded-2xl '> 
        <div className='mt-[34px] ml-[24px]'>
            <h1 className='text-black text-base font-bold p-[5px]'>Identificação</h1>
                <div className='flex gap-[100px]'>
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px]'>Eleição:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px]'>0.000</h1>
                
                </div>  
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px]'>Eleição:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px]'>0.000</h1>
                </div>  
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px]'>Eleição:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px]'>0.000</h1>
                </div>  
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px]'>Eleição:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px]'>0.000</h1>
                </div>  
            </div>

            <h1 className='text-black text-base font-bold p-[5px] mt-[50px]'>Urna Eletrônica - Correspondência Efetivada</h1>
            <div className='flex gap-[160px]'>
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px]'>Eleição:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px] absolute'>0.000</h1>
                
                </div> 
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px]'>Eleição:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px] absolute'>0.000</h1>
                </div>  
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px]'>Eleição:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px] absolute'>0.000</h1>
                </div>  
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px]'>Eleição:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px]'>absolute in this h1</h1>
                </div>  
            </div>
            <div className='flex gap-[160px]'>
                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px]'>Eleição:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px] absolute'>0.000</h1>
                
                </div>  
                <div className='flex-col '>
                    <h1 className='text-gray text-xs font-bold p-[5px]'>Eleição:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px] absolute'>0.0000000000000000000000000</h1>
                </div>  

                <div className='flex-col'>
                    <h1 className='text-gray text-xs font-bold p-[5px]'>Eleição:</h1>
                    <h1 className='text-blue-light text-xs font-bold p-[5px] absolute'>0.000</h1>
                </div>  
            </div>
        </div>
    </div>
  );
}

export default Result;
