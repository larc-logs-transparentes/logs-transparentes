import React, { useCallback, useState, useRef } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Certificate from './FileVerify';
import {buParser} from '../../../services/buParser.js';

const DragAndDrop = () => {
  const [dragActive, setDragActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    handleFile(files[0]);
  }, []);

  const handleInputChange = (e) => {
    const files = e.target.files;
    handleFile(files[0]);
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target.result;
      const buteste = await buParser(content);
      console.log(buteste);
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleClick = () => { 
    fileInputRef.current.click();
  };

  const handleVerifyClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 mt-4 gap-4">
      <h1 className='text-blue font-medium text-2xl'>Verificador de Arquivos</h1>
      <h1 className='text-blue font-medium  '>Verifique se o arquivo fornecido pelo TSE está presente em nossos sistemas</h1>
      <div className='flex flex-row gap-12 w-[100%] place-content-center'>
        <div 
          className={`p-6 border-2 w-[90%] gap-4 items-center justify-center bg-lighter-gray flex flex-col rounded-2xl ${dragActive ? 'border-yellow' : 'border-blue-light'}`} 
          onDragEnter={handleDrag} 
          onDragOver={handleDrag} 
          onDragLeave={handleDrag} 
          onDrop={handleDrop}
        >
          <p className="text-blue-light font-medium text">Para verificar o arquivo selecione o tipo, e depois clique no botão anexar.</p>
          <div className='flex flex-row gap-4'>
            <button className="bg-white border-yellow border-[1px] text-blue py-[3px] px-4 rounded-full my-2 font-medium" onClick={handleClick}>
              Selecionar arquivo
            </button>
            <button className="px-4 rounded-full border-blue-light border-[1px] my-2 font-medium text-blue-light" onClick={handleVerifyClick}>
             Anexar
            </button>
            <button className="px-4  my-2 font-medium text-blue-light" >
             Anexo: arquivo bu    X
            </button>
          </div>
          <div className='flex flex-row text-blue-light font-medium'>
            <h1>
              Opcional, selecione o arquivo da assinatura (.vscmr) caso precise
            </h1>
          </div>
          <button className="py-[3px] px-4 rounded-full border-blue-light border-[1px] font-medium text-blue-light" onClick={handleVerifyClick}>
             Anexar
            </button>
          <input 
            type="file" 
            className="hidden" 
            onChange={handleInputChange} 
            ref={fileInputRef} 
          />
        </div>
      </div>

      {isModalOpen && <Certificate closeModal={closeModal} id={'6617250b77da1dfa70f5ef56'} />}
    </div>
  );
};

export default DragAndDrop;
