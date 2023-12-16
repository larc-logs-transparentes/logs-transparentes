import React, { useEffect, useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Success from './Success';
import Fail from './Fail';       

function SendBu({ closeModal }) {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [url, setUrl] = useState('');
  const [selectedMonitor, setSelectedMonitor] = useState('');
  const [operationStatus, setOperationStatus] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'visible'; };
  }, []);

  const handleNomeCompletoChange = (e) => {
    setNomeCompleto(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleMonitorClick = (monitor) => {
    setSelectedMonitor(monitor);
  };

  const handleOperationStatusClick = (status) => {
    setOperationStatus(status);
    if (status !== 'Fail') {
      setDescription('');
    }
  };

  const handleButtonClick = async () => {
    console.log({ nomeCompleto, url, selectedMonitor, operationStatus });
    // Here you would typically make an API call or some logic to determine success or failure
    const isSuccess = true; // Determine if the operation is a success
    setShowModal(isSuccess ? 'success' : 'fail');
    // Don't close the modal immediately; let the user see the success or fail message
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  
  const getMonitorButtonClasses = (monitor) => {
    return `rounded-full px-2 h-[37px] min-w-[100px] font-bold border-2 border-blue text-black ${
      selectedMonitor === monitor ? 'bg-blue' : 'bg-white hover:bg-blue'
    }`;
  };

  const getStatusButtonClasses = (status) => {
    return `rounded-full px-2 h-[37px] min-w-[100px] font-bold border-2 border-blue text-black ${
      operationStatus === status ? 'bg-blue' : 'bg-white hover:bg-blue'
    }`;
  };
  const [showModal, setShowModal] = useState(null);


  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur z-30'>
      <div className='relative w-[714px] min-h-[500px] border-2 border-black rounded-2xl bg-white flex p-2'> 
        <div className='mt-[34px] ml-[24px] flex-col w-full'>
          <div className='justify-between items-start flex'>
            <h1 className='font-bold'>Deseja enviar essa verificação para o monitor?</h1>
            <HighlightOffIcon onClick={closeModal} className="text-blue cursor-pointer mr-[16px]" style={{ width: '32px', height: '32px' }}/>
          </div>
          <h2 className='mt-[16px] text-sm'>Escolha o Monitor de sua preferência:</h2>
          <div className='flex gap-[16px] mt-[10px]'>
            <button onClick={() => handleMonitorClick('USP')} 
              className={getMonitorButtonClasses('USP')}>USP</button>
            <button onClick={() => handleMonitorClick('Polícia Federal')} 
              className={getMonitorButtonClasses('Polícia Federal')}>Polícia Federal</button>
            <button onClick={() => handleMonitorClick('Outro Monitor')} 
              className={getMonitorButtonClasses('Outro Monitor')}>Outro Monitor</button>
          </div>
          <h2 className='mt-[34px]'>Preencha as informações abaixo para enviar ao monitor</h2>
          <div className='flex gap-[16px] mt-[10px]'>
            <div className='flex flex-col'>
              <label htmlFor='nomeCompleto' className='text-sm'>Nome Completo</label>
              <input type='text' id='nomeCompleto' value={nomeCompleto} onChange={handleNomeCompletoChange} 
              className='mt-2 p-2 border-2 border-blue-light rounded-md w-[294px]' placeholder='Nome Completo'/>
            </div>
            {selectedMonitor === 'Outro Monitor' && (
              <div className='flex flex-col'>
                <label htmlFor='url' className='text-sm'>URL</label>
                <input type='text' id='url' value={url} onChange={handleUrlChange} 
                className='mt-2 p-2 border-2 border-blue-light rounded-md w-[340px]' placeholder='URL'/>
              </div>
            )}
          </div>
          <h2 className='mt-[20px]'>Preencha as informações abaixo para enviar ao monitor</h2>
          <div className='flex gap-[16px]'>
            <button onClick={() => handleOperationStatusClick('Success')} 
              className={getStatusButtonClasses('Success')}>Sim</button>
            <button onClick={() => handleOperationStatusClick('Fail')} className={getStatusButtonClasses('Fail')}>Não</button>
            </div>
            {operationStatus === 'Fail' && (
              <div className='flex flex-col mt-3'>
                <label htmlFor='description' className='text-sm'>Descrição</label>
                <textarea id='description' value={description} onChange={handleDescriptionChange} 
                  className='mt-2 border-2 border-blue-light rounded-md w-[80%]' placeholder='Descreva o motivo'/>
              </div>
            )}
          {selectedMonitor && <p className='mt-3 text-sm'>{`Você escolheu a ${selectedMonitor}`}</p>}
          <button onClick={handleButtonClick} className="mt-[20px] rounded-full bg-yellow  h-[37px] w-[189px] font-bold text-center">Enviar para o Monitor</button>
        </div>
      </div>
      {showModal === 'success' && <Success closeModal={() => setShowModal(null)} />}
      {showModal === 'fail' && <Fail closeModal={() => setShowModal(null)} />}
    </div>
  );
}

export default SendBu;
