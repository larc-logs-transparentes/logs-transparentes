import React, { useEffect } from 'react';

function SendBu({ closeModal }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'visible'; };
  }, []); // Empty dependency array ensures effect runs only on mount and unmount

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur z-1000'>
      <div className='relative w-[892px] h-[403px] border-2 border-black rounded-2xl bg-white'> 
        <div className='mt-[34px] ml-[24px]'>
            box with a test
        </div>
        <button onClick={closeModal} className="rounded-full bg-yellow-400 px-2 h-[37px] w-[194px] ml-[256px] font-bold">Close Modal</button>
      </div>
    </div>
  );
}

export default SendBu;
