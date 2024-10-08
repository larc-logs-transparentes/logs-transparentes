import React, { useCallback, useState, useRef, useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import InfoIcon from '../../../assets/\InfoIcon.svg';

import FileVerify from './FileVerify';

import { getBuByInfo } from '../../../endpoints/bu.api.js';

import { assinaturaParser } from '../../../services/assinaturaParser.js';
import { buParser } from '../../../services/buParser.js';
import { getUFfromMunicipio } from '../../../services/municipioToUF.js';
import { PythonTruetoJavascriptTrue } from '../../../services/pyodide.js';
import { VerificationDragAndDrop } from '../../../services/VerificationDragAndDrop.js';

import { useGetStatesByElectionQuery } from '../../../context/core/api/section/infra/sectionSlice';

async function extractDataFromBuFile(event) {
  const content = event.target.result;
  const bu_file = await buParser(content);
  const municipio = bu_file.urna.correspondenciaResultado.identificacao[1].municipioZona.municipio;
  const uf = await getUFfromMunicipio(municipio);
  const zona = bu_file.urna.correspondenciaResultado.identificacao[1].municipioZona.zona;
  const secao = bu_file.urna.correspondenciaResultado.identificacao[1].secao;
  return { uf, zona, secao, content };
}


const DragAndDrop = () => {
  const [dragActive, setDragActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const [bu, setBu] = useState('');
  const [buFileName, setBuFileName] = useState('');
  const [vscmrFileName, setVscmrFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [hashes, setHashes] = useState([]);
  const [assinaturaHW, setAssinaturaHW] = useState('');
  const [assinaturaSW, setAssinaturaSW] = useState('');
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
      fileRef.current = files[0];
      if (files[0].name.endsWith('.bu')) {
        setBuFileName(files[0].name);
        handleFileBU(files[0]);
      } else if (files[0].name.endsWith('.vscmr')) {
        setVscmrFileName(files[0].name);
        handleFileAssinatura(files[0]);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      fileRef.current = files[0];
      if (files[0].name.endsWith('.bu')) {
        setBuFileName(files[0].name);
        handleFileBU(files[0]);
      } else if (files[0].name.endsWith('.vscmr')) {
        setVscmrFileName(files[0].name);
        handleFileAssinatura(files[0]);
      }
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

  const handleFileBU = async (file) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const { uf, zona, secao, content } = await extractDataFromBuFile(event);
      const bu = await getBuByInfo(uf, zona, secao);
      setBu(await bu);
      const base64BuFile = arrayBufferToBase64(content);
      const verificationResult = await PythonTruetoJavascriptTrue(await VerificationDragAndDrop(bu._id, base64BuFile));
      setIsTrue(verificationResult);
      openModal(); 
      setLoading(false); 
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      setLoading(false); 
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileAssinatura = async (file) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const content = event.target.result;
        const assinatura_file = await assinaturaParser(content);
        console.log("Parsed assinatura file:", assinatura_file);
        console.log("Keys:", Object.keys(assinatura_file));
        if (assinatura_file["Assinatura HW"] && assinatura_file["Assinatura HW"].conteudoAutoAssinado) {
          const assinaturaHW = assinatura_file["Assinatura HW"].conteudoAutoAssinado;
          setAssinaturaHW(assinaturaHW);
          console.log("assinaturaHW set:", assinaturaHW);
        } else {
          console.error("Assinatura HW or its conteudoAutoAssinado is undefined or missing");
          setAssinaturaHW(''); 
        }
  
        if (assinatura_file["Assinatura SW"] && assinatura_file["Assinatura SW"].conteudoAutoAssinado) {
          const assinaturaSW = assinatura_file["Assinatura SW"].conteudoAutoAssinado;
          setAssinaturaSW(assinaturaSW);
          console.log("assinaturaSW set:", assinaturaSW);
        } else {
          console.error("Assinatura SW or its conteudoAutoAssinado is undefined or missing");
          setAssinaturaSW(''); 
        }
  
      } catch (error) {
        console.error('Error parsing or setting assinatura fields:', error);
      } finally {
        setLoading(false);
      }
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      setLoading(false);
    };
    reader.readAsArrayBuffer(file);
  };
  
  
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleVerifyBUClick = () => {
    if (fileRef.current && buFileName.endsWith('.bu')) {
      setLoading(true); 
      handleFileBU(fileRef.current);
    } else {
      console.log('No .bu file selected');
    }
  };

  const handleVerifyAssinaturaClick = () => {
    if (fileRef.current && vscmrFileName.endsWith('.vscmr')) {
      setLoading(true); 
      handleFileAssinatura(fileRef.current);
    } else {
      console.log('No .vscmr file selected');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
  }, [isTrue]);

  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 mt-4 gap-1">
      <h1 className='text-blue font-medium text-center text-2xl'>Verificador de Arquivos</h1>
      <h1 className='text-blue font-medium text-center mb-4'>Verifique se o arquivo fornecido pelo TSE está presente em nossos sistemas</h1>
      <div className='flex flex-row gap-12 w-[100%] place-content-center'>
        <div
          className={`p-6 border-2 w-[90%] md:h-[218px] gap-4 items-center justify-center bg-lighter-gray flex flex-col rounded-2xl ${dragActive ? 'border-yellow' : 'border-blue-light'}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <p className="text-blue font-medium">Para verificar o arquivo selecione o tipo, e depois clique no botão anexar.</p>
          <div className='flex flex-row gap-4 md:text-base text-sm'>
            <button className="bg-white border-yellow border-[1px] text-blue py-[3px] px-4 rounded-full my-2 font-medium" onClick={handleClick}>
              Selecionar arquivo 
            </button>
            <button className="bg-white hover:bg-blue-light px-4 rounded-full border-blue-light border-[1px] my-2 font-medium text-blue " onClick={handleVerifyBUClick}>
              Anexar
            </button>
            <button className="px-4 my-2 font-medium text-blue md:flex hidden">
              {buFileName ? `Anexo: ${buFileName}` : 'Anexo:'}
            </button>
          </div>
          <div className='flex flex-row text-blue font-medium'>
            <h1>
              Opcional, selecione o arquivo da assinatura <b>(.vscmr)</b> caso precise
            </h1>
            <img src={InfoIcon} alt="InfoIcon" className='mb-10 md:mb-0 md:ml-[16px]' />
          </div>
          <div className='flex flex-row gap-4'>
            <div className="relative flex md:text-base text-sm items-center gap-8">
              {/* <button className="bg-white border-yellow border-[1px] text-blue py-[3px] px-4 rounded-full my-2 font-medium" onClick={handleClick}>
                Selecionar arquivo Assinatura
              </button> */}
              <button className="bg-white hover:bg-blue-light py-[3px] px-4 rounded-full border-blue-light border-[1px] font-medium text-blue flex items-center gap-2" onClick={handleVerifyAssinaturaClick}>
                Anexar
              </button>
            </div>
            {/* <button className="px-4 my-2 font-medium text-blue md:flex hidden">
              {vscmrFileName ? `Anexo Assinatura: ${vscmrFileName}` : 'Anexo Assinatura:'}
            </button> */}
          </div>
          <div>{loading && <CircularProgress size={20} className='right-[-30px]' />}</div>
          <input
            type="file"
            className="hidden"
            onChange={handleInputChange}
            ref={fileInputRef}
          />
        </div>
      </div>
      
      <div className='text-center  text-md relative font-sans font-bold text-black underline mt-[20px] md:mb-[10px]'>
          <button className="rounded-full bg-yellow hover:bg-blue-light px-2 h-[35px] w-[97px]">Verificar</button>
        </div>
      {isModalOpen && <FileVerify closeModal={closeModal} bu={bu} isTrue={isTrue} hashes={hashes} assinaturaHW={assinaturaHW} assinaturaSW={assinaturaSW} />}
    </div>
  );
};

export default DragAndDrop;
