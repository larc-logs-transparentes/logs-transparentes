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
    <div className="flex flex-col items-center justify-center bg-white p-6 mt-4">
      <div 
        className={`p-12 w-full border-2 items-center justify-center flex flex-col border-dashed rounded-2xl ${dragActive ? 'border-yellow' : 'border-blue-light'}`} 
        onDragEnter={handleDrag} 
        onDragOver={handleDrag} 
        onDragLeave={handleDrag} 
        onDrop={handleDrop}
      >
        <CloudUploadIcon sx={{ fontSize: 60 }} className="text-[24px] text-blue" />
        <p className="text-blue">Arraste e solte o arquivo de PDF aqui ou</p>
        <p className="text-blue font-bold">ou</p>
        <button className="bg-white border-yellow border-2 text-blue py-2 px-4 rounded-full my-2" onClick={handleClick}>
          Selecionar arquivo
        </button>
        <input 
          type="file" 
          className="hidden" 
          onChange={handleInputChange} 
          ref={fileInputRef} 
        />
      </div>
      <button className="bg-yellow text-black font-bold py-2 px-4 rounded-full mt-4">
        Verificar
      </button>
    </div>
  );
};

export default DragAndDrop;
