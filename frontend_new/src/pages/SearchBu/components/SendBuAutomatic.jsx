import React, { useState } from 'react';
import  Camera  from './Camera'; 

const SendBuAutomatic = ({ closeAutomaticModal }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30'>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <Camera />
              <button 
                className="mt-3 text-black font-bold py-2 px-4 rounded"
                onClick={() => {
                    setIsOpen(false);
                    closeAutomaticModal();
                  }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendBuAutomatic;
