import React, { useCallback, useState, useRef } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const DragAndDrop = () => {
  const [dragActive, setDragActive] = useState(false);
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
    console.log(files);
  }, []);

  const handleInputChange = (e) => {
    const files = e.target.files;
    console.log(files);
  };

  const handleClick = () => { 
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 mt-4 gap-4">
      <h1 className='text-blue font-medium text-2xl'>Verificador de Arquivos</h1>
      <h1 className='text-blue font-medium  '>Verifique se o arquivo fornecido pelo TSE está presente em nossos sistemas</h1>
      <div className='flex flex-row gap-8 w-[100%] place-content-center'>
        <div 
          className={`p-12 w-[40%] border-2 items-center justify-center flex flex-col rounded-2xl ${dragActive ? 'border-yellow' : 'border-blue-light'}`} 
          onDragEnter={handleDrag} 
          onDragOver={handleDrag} 
          onDragLeave={handleDrag} 
          onDrop={handleDrop}
        >
          {/* <CloudUploadIcon sx={{ fontSize: 60 }} className="text-[24px] text-blue" /> */}
          <p className="text-blue text-xl">Verificação Simples</p>
          <p className="text-blue text-sm">Selecione o tipo de arquivo, e depois clica no botão verificar</p>
          <div className='flex flex-row gap-4'>
            <button className="bg-white border-yellow border-2 text-blue py-2 px-4 rounded-full my-2 font-medium" onClick={handleClick}>
              Selecionar arquivo
            </button>
            <button className="bg-yellow px-8 rounded-full my-2 font-medium" onClick={handleClick}>
              Verificar
            </button>
          </div>
          <input 
            type="file" 
            className="hidden" 
            onChange={handleInputChange} 
            ref={fileInputRef} 
          />
        </div>
        <div 
          className={`p-12 border-2 w-[40%] items-center justify-center flex flex-col rounded-2xl ${dragActive ? 'border-yellow' : 'border-blue-light'}`} 
          onDragEnter={handleDrag} 
          onDragOver={handleDrag} 
          onDragLeave={handleDrag} 
          onDrop={handleDrop}
        >
          {/* <CloudUploadIcon sx={{ fontSize: 60 }} className="text-[24px] text-blue" /> */}
          <p className="text-blue text-xl font-bold">Verificação de Assinaturas</p>
          <p className="text-blue text-sm">Selecione arquivo da assinatura (.vscmr)</p>
          <div className='flex flex-row gap-4'>
            <button className="bg-white border-yellow border-2 text-blue py-2 px-4 rounded-full my-2 font-medium" onClick={handleClick}>
              Selecionar arquivo
            </button>
            <button className="bg-yellow px-8 rounded-full my-2 font-medium" onClick={handleClick}>
              Verificar
            </button>
          </div>
          <input 
            type="file" 
            className="hidden" 
            onChange={handleInputChange} 
            ref={fileInputRef} 
          />
        </div>
      </div>

    </div>
  );
};

export default DragAndDrop;
