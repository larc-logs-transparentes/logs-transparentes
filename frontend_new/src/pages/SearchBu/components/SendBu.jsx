import React, { useEffect, useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function SendBu({ closeModal }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'visible'; };
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    console.log(inputValue);
    closeModal();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur'>
      <div className='relative w-[714px] h-[440px] border-2 border-black rounded-2xl bg-white flex'> 
        <div className='mt-[34px] ml-[24px] flex-col w-full'>
          <div className='justify-between items-start flex'>
            <h1 className='font-bold'>Deseja enviar essa verificação para o monitor?</h1>
            <HighlightOffIcon onClick={closeModal} className="text-blue cursor-pointer mr-[16px] mt-[16px]" style={{ width: '32px', height: '32px' }}/>
          </div>
          <h2>Preencha as informações abaixo para enviar ao monitor</h2>
          <div className='flex gap-[16px] mt-[10px]'>
            <div className='flex flex-col'>
              <label htmlFor='nomeCompleto' className='text-sm'>Nome Completo</label>
              <input type='text' id='nomeCompleto' value={inputValue} onChange={handleInputChange} 
              className='mt-2 p-2 border-2 border-blue-light rounded-md w-[294px]' placeholder='Nome Completo'/>
            </div>
          <div className='flex  flex-col'>
            <label htmlFor='url' className='text-sm'>URL</label>
            <input type='text' id='url' value={inputValue} onChange={handleInputChange} 
            className='mt-2 p-2 border-2 border-blue-light rounded-md w-[340px]' placeholder='URL'/>
          </div>
        </div>
        <h2 className='mt-[16px] text-sm'>Escolha o Monitor de sua preferência:</h2>
        <div className='flex gap-[16px] mt-[10px]'>
          <button onClick={handleButtonClick} 
          className="rounded-full bg-white px-2 h-[37px] min-w-[100px] font-bold border-2 border-blue text-black hover:bg-blue">USP</button>
          <button onClick={handleButtonClick} 
          className="rounded-full bg-white px-2 h-[37px] min-w-[100px] font-bold border-2 border-blue text-black hover:bg-blue">Monitor 2</button>
          <button onClick={handleButtonClick} 
          className="rounded-full bg-white px-2 h-[37px] min-w-[100px] font-bold border-2 border-blue text-black hover:bg-blue">Outro Monitor</button>
        </div>
        <button onClick={handleButtonClick} className="mt-[40px] rounded-full bg-yellow  h-[37px] w-[189px] font-bold text-center">Enviar para o Monitor</button>
        </div>
      </div>
    </div>
  );
}

export default SendBu;
