import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const ErrorBu = ({ closeModal }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md z-50'>
      <div className='relative  bg-white border  rounded-2xl p-6 w-[714px] min-h-[500px]'> 
        <div className="absolute top-3 right-3">
          <HighlightOffIcon onClick={closeModal} className="text-red-500 cursor-pointer" style={{ fontSize: '1.5rem' }}/>
        </div>
        
        <h2 className="text-xl font-bold text-red-600 mb-4">Erro ao validar o BU</h2>
        <p className="mb-4 text-gray font-bold">O BU foi alterado desde a sua inserção!</p>
        <a href="" className="text-yellow font-bold hover:underline">Saiba mais</a>
        
        <div className="mt-6 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold text-blue">Mensagem de erro:</p>
          
        </div> 
      </div>
    </div>
  );
};

export default ErrorBu;
