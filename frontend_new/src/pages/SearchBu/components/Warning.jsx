import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import SendBu from './SendBu';

function Warning() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
      };
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
      };
  
  return (
    
    <div className='font-sans relative z-50 font-bold fixed'>
      <div className='flex flex-row bg-blue-light md2:min-h-[100px] min-h-[100px] h-[9.5vh] place-content-center gap-[30%] p-8'>
        <p className='text-black mt-2 text-center'>Antes de enviar verifique as informações:</p>
        {isModalOpen && <SendBu closeModal={closeModal} />}
        <button onClick={toggleModal} className="rounded-full bg-yellow px-2 h-[37px] w-[194px] font-bold">Enviar para o Monitor</button>
      </div>
    </div>
  );
}

export default Warning;
