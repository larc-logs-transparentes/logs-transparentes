import React, { useEffect } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Fail({ closeModal }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'visible'; };
  }, []);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur z-30'>
      <div className='relative w-[714px] min-h-[500px] border-2 border-black rounded-2xl bg-white flex p-2'> 
        <div className='mt-[34px] ml-[24px] flex-col w-full'>
          <div className='justify-between items-start flex'>
            <h1 className='font-bold'>Close?</h1>
            <HighlightOffIcon onClick={closeModal} className="text-blue cursor-pointer mr-[16px]" style={{ width: '32px', height: '32px' }}/>
          </div>
          <h1 className='font-bold'>Fail</h1>
        </div>
      </div>
    </div>
  );
}

export default Fail;
