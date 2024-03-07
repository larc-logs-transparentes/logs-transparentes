import React, { useState } from 'react';
import { ReactComponent as ManualIcon } from '../../../assets/manual-icon.svg';
import { ReactComponent as AutomaticIcon } from '../../../assets/automatic-icon.svg';
import { useParams } from 'react-router-dom';
import SendBu from './SendBu';
import SendBuAutomatic from './SendBuAutomatic'; // Import SendBuAutomatic
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function ManualAutomatic({ closeModal , selection }) {
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isAutomaticModalOpen, setIsAutomaticModalOpen] = useState(false); 
  const { id } = useParams(); 

  const toggleManualModal = () => setIsManualModalOpen(!isManualModalOpen);
  const toggleAutomaticModal = () => setIsAutomaticModalOpen(!isAutomaticModalOpen); 

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center backdrop-blur-md z-50 '>
      {isManualModalOpen && <SendBu openSendBu={toggleManualModal} closeModal={closeModal} />}
      {isAutomaticModalOpen && <SendBuAutomatic closeAutomaticModal={toggleAutomaticModal} />} 
      
      <div className='relative bg-white rounded-2xl shadow-xl flex flex-col p-8 md2:w-[714px] md2:h-[469px]'>
        <HighlightOffIcon onClick={closeModal} className="absolute top-4 right-4 text-blue-600 cursor-pointer" style={{ width: '32px', height: '32px' }} />
        <h1 className='text-xl font-bold mb-2'>Deseja enviar essa verificação para o monitor?</h1>
        <p className='mb-8'>Preencha as informações abaixo para enviar para o monitor.</p>
        <div className='flex align-items-center items-center place-content-center gap-[2%]'>
          <div className='flex-col flex'>Manual
            <div onClick={() => { selection(); closeModal();
    }}  className='cursor-pointer flex flex-col items-center border-blue-light hover:bg-blue-light border-2 p-2 rounded-2xl text-center text-black md2:h-[242px] md2:w-[320px]'>
              <button className="">
                <ManualIcon className="w-24 h-24" />
              </button>
              <p className='mt-2 font-bold w-[100%]'>Clique aqui para verificar se os dados batem entre a tela do dispositivo com o papel em mãos</p>
            </div>
          </div>
          <div className='flex-col flex'>Automático
            <div onClick={toggleAutomaticModal} className='cursor-pointer flex flex-col items-center border-blue-light hover:bg-blue-light border-2 p-2 rounded-2xl text-center text-black md2:h-[242px] md2:w-[320px]'>
              <button className="">
                <AutomaticIcon className="w-24 h-24" />
              </button>
              <p className='mt-2 font-bold'>Clique aqui para abrir a câmera do seu celular e escanear qr-code.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManualAutomatic;
