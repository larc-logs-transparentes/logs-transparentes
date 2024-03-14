import React, { useEffect } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function Success({ closeModal, closeAllModals }) {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'visible'; };
  }, []);
  

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
        <CheckCircleOutlineIcon  className="text-blue cursor-pointer " style={{ width: '64px', height: '64px' }} />
          <h1 className='text-xl font-bold mt-3 mb-6'>Sucesso!</h1>
          <p className='text-center mb-8'>Verificação enviada com sucesso para o monitor!</p>
          <button onClick={closeAllModals} className="mt-[20px] rounded-full bg-yellow  h-[37px] w-[189px] font-bold text-center text-black">Voltar para Home</button>
        </div>
      </div>
    </div>
  );
}

export default Success;
