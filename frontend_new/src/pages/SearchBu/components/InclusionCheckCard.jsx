import React, { useEffect, useState, useRef } from 'react';
import ErrorIcon from '../../../assets/ErrorIcon.svg';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom'; 
const InclusionCheckCard = ({ closeModal, bu, proof, isProofTrue }) => {
  const [lastRoot, setLastRoot] = useState({ value: '', timestamp: '' }); 
  const [buHash, setBuHash] = useState('');
  const navigate = useNavigate(); 
  const modalRef = useRef();

  useEffect(() => {
    const run = async () => {
      const election = bu.eleicoes[0];
      setBuHash(bu.merkletree_info[election].hash)
      setLastRoot(proof, proof)
    };

    run();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  function downloadDataProof() {
    const json = JSON.stringify(proof, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dataProof.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function navigateToInclusion() {
    navigate(`#`);
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex backdrop-blur z-30 justify-center items-center'>
      <div className='relative sm:w-full md:w-[700px] lg:w-[800px] min-h-full md:min-h-[320px] border-2 border-blue rounded-2xl bg-white p-8' ref={modalRef}> 
        <div className="absolute top-3 right-3">
          <HighlightOffIcon onClick={closeModal} className="text-blue cursor-pointer mr-[16px]" style={{ width: '32px', height: '32px' }}/>
        </div>

        <h2 className="text-lg font-medium md:text-[24px] mb-4 text-blue break-all">Verificação de inclusão de BU</h2>
        <div className='flex flex-col md:flex-row gap-0 md:gap-8'>
          
          {isProofTrue === 'True' ? (
            <div>
              <div className="font-bold text-[16px] md:text-[24px] text-blue flex items-center gap-2">
                <CheckCircleIcon style={{ color: '#66FF99' }} />
                <h2>O BU foi verificado corretamente!</h2>
              </div>
              <div className="text-gray text-sm md:mb-4">Ele está presente na árvore e não pode ser modificado</div>
            </div> 
          ) : (
            <div>
              <div className="font-bold text-red-light flex items-center gap-2">
                <img src={ErrorIcon}/>
                <h2>Erro ao Validar o BU</h2>
              </div>
              <div className="text-gray text-sm mb-4">O BU não está presente na árvore ou foi alterado</div>
            </div> 
            )
          }
          
          <h2 className='md:text-center md:mt-2 text-md mb-2 md:mb-0 relative font-sans font-bold text-yellow cursor-pointer' onClick={navigateToInclusion}>Saiba Mais</h2>
        </div>

        <div className="text-sm  font-bold text-gray break-all">

          <div className="mb-3">
            <strong className='text-blue'>BU:</strong>
            <div>Hash: {buHash}</div>
          </div>

          <div className="mb-3">
            <strong className='text-blue'>Árvore Global:</strong>
            <div>Hash: {proof.global_root.value}</div>
            <div>Última atualização: {proof.global_root.timestamp}</div> 
            <div>Assinatura: {proof.global_root.signature}</div> 
          </div>

          <div className="mb-3">
            <strong className='text-blue'>Árvore Local:</strong>
            <div>Nome: {proof.local_tree.local_root.tree_name}</div>
            <div>Hash: {proof.local_tree.local_root.value}</div>
            <div>Última atualização: Em construção </div> 
            <div>Tamanho: {proof.local_tree.local_root.tree_size}</div> 
          </div>

        </div>

        <div className="flex gap-4">
            <button onClick={downloadDataProof} className="rounded-full bg-yellow px-2 h-[37px] w-[132px] font-bold">Baixar Provas</button>
        </div>
      </div>
    </div>
  );
};

export default InclusionCheckCard;
