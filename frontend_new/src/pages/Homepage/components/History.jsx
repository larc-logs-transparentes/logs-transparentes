import React from 'react';
import { useNavigate } from 'react-router-dom';
import iconbus from '../../../assets/Iconbus.svg';
import iconlogs from '../../../assets/Iconlogs.svg';
import iconcertificados from '../../../assets/Iconscertificados.svg';

function History() {
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className='relative'>
      <div className='flex flex-wrap lg:flex-nowrap font-sans bg-blue gap-[1%] items-center p-8 justify-center'>
        <div className='flex m-1 gap-8 flex-row items-center border-white text-white border-2 p-2 px-8 rounded-lg shadow-md'>
          <img src={iconbus} alt="Verified BUs" className='h-6 mb-2' />
          <div className='flex flex-col'>
          <p className='text-2xl font-bold'>+503.425</p>
          <p className='whitespace-nowrap max-h-1[vw]'>BUs verificados</p>
          </div>
        </div>
        <div className='flex m-1  gap-8 flex-row items-center bg-blue border-white border-2 text-white px-8  p-2 rounded-lg shadow-md'>
          <img src={iconlogs} alt="Logs" className='h-6 mb-2' />
          <div className='flex flex-col'>
            <p className='text-2xl font-bold'>+535.253</p>
            <p>Logs</p>
          </div>
        </div>
        <div className='flex m-1  gap-8 flex-row items-center border-white border-2 h-[10%] p-2 px-8 rounded-lg text-white shadow-md'>
          <img src={iconcertificados} alt="Certificates" className='h-6 mb-2' />
          <div className='flex flex-col'>
          <p className='text-2xl font-bold'>+305.634</p>
          <p>Certificados</p>
          </div>
        </div>
        <div className='flex px-7 lg:px-3'>
          <button className="m-1 bg-yellow hover:bg-blue-light text-black font-bold py-2 px-4 rounded-full shadow-md transition-colors min-w-[50%] whitespace-nowrap" onClick={handleButtonClick}>
            Ver + dados salvos
          </button>
        </div>
      </div>
    </div>
  );
}

export default History;