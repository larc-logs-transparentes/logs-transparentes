import React, { useEffect } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useNavigate } from 'react-router-dom';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

function Fail({ closeModal }) {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'visible'; };
  }, []);
  
  const navigateHome = () => {
    navigate('/');
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md z-30 '>
     <div className='relative w-[714px] h-[300px] border-2 border-black rounded-2xl bg-white flex flex-col items-center justify-center p-2'> 
        <button
          onClick={closeModal}
          className='absolute top-5 right-5 text-gray-500 hover:text-gray-700'
          aria-label='Close modal'
        >
          <HighlightOffIcon  className="text-blue cursor-pointer mr-[16px]" style={{ width: '32px', height: '32px' }} />
        </button>
        <div className='flex flex-col items-center text-blue'>
        <WarningAmberIcon  className="text-red cursor-pointer " style={{ width: '64px', height: '64px' }} />
          <h1 className='text-xl font-bold mt-3 mb-6 text-red '>Erro!</h1>
          <p className='text-center mb-8'>Não foi possível enviar a verificação. Por favor, entre em contato com o monitor ou com o responsável pela plataforma.</p>
          <button onClick={navigateHome} className="mt-[20px] rounded-full bg-yellow  h-[37px] w-[189px] font-bold text-center text-black">Enviar para o Monitor</button>
        </div>
      </div>
    </div>
  );
}

export default Fail;
