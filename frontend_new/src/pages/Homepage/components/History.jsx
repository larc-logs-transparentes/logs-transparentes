import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import iconbus from '../../../assets/Iconbus.svg';
import iconlogs from '../../../assets/Iconlogs.svg';
import iconcertificados from '../../../assets/Iconscertificados.svg';


function History() {
  
  return (
    <div className='font-sans bg-blue'>
      <div className='text-center text-white py-4'>HISTÓRICO</div>
      <div className='flex justify-evenly items-center p-4'>
        <div className='flex flex-col items-center bg-teal-600 p-4 rounded-lg shadow-md'>
          <img src={iconbus} alt="Verified BUs" className='h-6 mb-2' />
          <p className='text-2xl font-bold'>503.425</p>
          <p>BUs verificados</p>
        </div>
        <div className='flex flex-col items-center bg-blue border-white p-4 rounded-lg shadow-md'>
          <img src={iconlogs} alt="Logs" className='h-6 mb-2' />
          <p className='text-2xl font-bold'>535.253</p>
          <p>Logs</p>
        </div>
        <div className='flex flex-col items-center bg-teal-600 p-4 rounded-lg shadow-md'>
          <img src={iconcertificados} alt="Certificates" className='h-6 mb-2' />
          <p className='text-2xl font-bold'>305.634</p>
          <p>Certificados</p>
        </div>
        <button className="bg-yellow text-black font-bold py-2 px-4 rounded-full shadow-md hover:bg-yellow-500 transition-colors">
          Ver + dados salvos
        </button>
      </div>
    </div>
  );
}

export default History;
