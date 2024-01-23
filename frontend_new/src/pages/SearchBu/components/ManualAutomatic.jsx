import React, { useState } from 'react';
import { ReactComponent as ManualIcon } from '../../../assets/manual-icon.svg';
import { ReactComponent as AutomaticIcon } from '../../../assets/automatic-icon.svg';
import { useParams } from 'react-router-dom';
import SendBu from './SendBu';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function ManualAutomatic({ closeModal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams(); // Extract id from URL

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md z-50'>
      {isModalOpen && <SendBu openSendBu={toggleModal} closeModal={closeModal} />}

      <div className='relative bg-white rounded-2xl shadow-xl flex flex-col items-center p-8 w-[550px] h-[350px]'>
        <HighlightOffIcon onClick={closeModal} className="absolute top-4 right-4 text-blue-600 cursor-pointer" style={{ width: '32px', height: '32px' }} />
        <h1 className='text-2xl font-bold mb-6'>Deseja enviar essa verificação para o monitor?</h1>
        <p className='mb-4 text-center'>Preencha as informações abaixo para enviar para o monitor.</p>
        <div className='flex align-items-center items-center w-full place-content-center gap-[20%]'>
          <div className='flex flex-col items-center'>
            <button onClick={toggleModal} className="flex justify-center bg-white hover:bg-blue-light items-center bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg ">
              <ManualIcon className="w-24 h-24" />
            </button>
            <p className='mt-2'>Manual</p>
          </div>
          <div className='flex flex-col items-center'>
            <button className="flex justify-center items-center bg-white hover:bg-blue-light text-white font-bold py-2 px-4 rounded-lg ">
              <AutomaticIcon className="w-24 h-24" />
            </button>
            <p className='mt-2'>Automatic</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManualAutomatic;
