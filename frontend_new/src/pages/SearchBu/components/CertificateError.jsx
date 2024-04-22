import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const CertificateError = ({ closeModal , id }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur z-30 justify-center items-center'>
      <div className='relative w-[714px] min-h-[320px] border-2 border-black rounded-2xl bg-white p-8'> 
        <div className="absolute top-3 right-3">
        <HighlightOffIcon onClick={closeModal} className="text-blue cursor-pointer mr-[16px]" style={{ width: '32px', height: '32px' }}/>
        </div>

        <h2 className="text-lg font-bold mb-4 text-gray-800">Verificação de inclusão de BU</h2>
        <div className='flex gap-8'>

          <h2 className="font-bold mb-4 text-blue-light">O bu foi verificado corretamente!</h2>
          <h2 className='text-center  text-md relative font-sans font-bold text-yellow underline'>Saiba Mais</h2>
        </div>

        <div className="text-sm  font-bold text-gray">
          <div className="mb-3">
            <strong className='text-blue-light'>Raiz Global:</strong>
            <div>Hash:</div>
            <div>Gerado em:</div>
          </div>

          <div className="mb-3">
            <strong className='text-blue-light'>BU:</strong>
            <div>Hash:</div>
          </div>
        </div>


        <div className="flex gap-4">
            <button  className="rounded-full bg-yellow px-2 h-[37px] w-[132px] font-bold">Baixar Provas</button>
        </div>
      </div>
    </div>
  );
};

export default CertificateError;
