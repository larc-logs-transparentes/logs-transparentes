import React, { useCallback, useState, useRef, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Certificate from './FileVerify';
import { buParser } from '../../../services/buParser.js';
import { getUFfromMunicipio } from '../../../services/municipioToUF.js';
import { VerificationDragAndDrop } from '../../../services/VerificationDragAndDrop.js';
import { getBuByInfo } from '../../../endpoints/bu.api.js';
import { PythonTruetoJavascriptTrue } from '../../../services/pyodide.js';

const DragAndDrop = () => {
  const [dragActive, setDragActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const [bu, setBu] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);
  const fileRef = useRef(null);

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
    if (files.length > 0) {
      setFileName(files[0].name);
      fileRef.current = files[0];
    }
  }, []);

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setFileName(files[0].name);
      fileRef.current = files[0];
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const handleFile = async (file) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target.result;
      const bu_file = await buParser(content);
      const municipio = bu_file.urna.correspondenciaResultado.identificacao[1].municipioZona.municipio;
      const uf = await getUFfromMunicipio(municipio);
      const zona = bu_file.urna.correspondenciaResultado.identificacao[1].municipioZona.zona;
      const secao = bu_file.urna.correspondenciaResultado.identificacao[1].secao;

      const bu = await getBuByInfo(uf, zona, secao);
      setBu(await bu);
      const base64BuFile = arrayBufferToBase64(content);

      console.log(base64BuFile);

      const verificationResult = await PythonTruetoJavascriptTrue(await VerificationDragAndDrop(bu._id, base64BuFile));
      console.log(verificationResult);

      setIsTrue(verificationResult);
      openModal(); // Call the function to open the modal after setting the state
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
    reader.readAsArrayBuffer(file);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleVerifyClick = () => {
    if (fileRef.current) {
      handleFile(fileRef.current);
    } else {
      console.log('No file selected');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
  }, [isTrue]);

  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 mt-4 gap-4">
      <h1 className='text-blue font-medium text-2xl'>Verificador de Arquivos</h1>
      <h1 className='text-blue font-medium'>Verifique se o arquivo fornecido pelo TSE está presente em nossos sistemas</h1>
      <div className='flex flex-row gap-12 w-[100%] place-content-center'>
        <div
          className={`p-6 border-2 w-[90%] gap-4 items-center justify-center bg-lighter-gray flex flex-col rounded-2xl ${dragActive ? 'border-yellow' : 'border-blue-light'}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <p className="text-blue-light font-medium">Para verificar o arquivo selecione o tipo, e depois clique no botão anexar.</p>
          <div className='flex flex-row gap-4'>
            <button className="bg-white border-yellow border-[1px] text-blue py-[3px] px-4 rounded-full my-2 font-medium" onClick={handleClick}>
              Selecionar arquivo
            </button>
            <button className="px-4 rounded-full border-blue-light border-[1px] my-2 font-medium text-blue-light" onClick={handleVerifyClick}>
              Anexar
            </button>
            <button className="px-4 my-2 font-medium text-blue-light">
              {fileName ? `Anexo: ${fileName}` : 'Anexo:'}
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

      {isModalOpen && <Certificate closeModal={closeModal} bu={bu} isTrue={isTrue} />}
    </div>
  );
};

export default DragAndDrop;
