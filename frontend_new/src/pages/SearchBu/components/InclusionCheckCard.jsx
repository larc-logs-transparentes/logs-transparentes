import React, { useEffect, useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getBuById } from '../../../endpoints/bu.api';
import { getAllRoots } from '../../../endpoints/merkletree.api'; 
import { useNavigate } from 'react-router-dom'; 
const InclusionCheckCard = ({ closeModal, id }) => {
  const [buData, setBuData] = useState(null);
  const [lastRoot, setLastRoot] = useState({ value: '', timestamp: '' }); 
  const [buHash, setBuHash] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBu = async () => {
      if (id) {
        const bu = await getBuById(id);
        const election = bu.eleicoes[0]
        setBuHash(bu.merkletree_info[election].hash);
      }
    };

    const fetchAllRoots = async () => {
      const rootsResponse = await getAllRoots();
      if (rootsResponse.status === 'ok' && rootsResponse.roots.length > 0) {
        const lastRoot = rootsResponse.roots[rootsResponse.roots.length - 1];
        setLastRoot({ value: lastRoot.value, timestamp: lastRoot.timestamp });
      }
    };

    fetchBu();
    fetchAllRoots(); 
  }, [id]);

  function downloadJson() {
    const json = JSON.stringify(buData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'buData.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function navigateToInclusion() {
    navigate(`/inclusion/${id}`);
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur z-30 justify-center items-center'>
      <div className='relative w-[714px] min-h-[320px] border-2 border-black rounded-2xl bg-white p-8'> 
        <div className="absolute top-3 right-3">
          <HighlightOffIcon onClick={closeModal} className="text-blue cursor-pointer mr-[16px]" style={{ width: '32px', height: '32px' }}/>
        </div>

        <h2 className="text-lg font-bold mb-4 text-gray-800">Verificação de inclusão de BU</h2>
        <div className='flex gap-8'>
          <div>
            <div className="font-bold  text-blue-light flex items-center gap-2">
              <CheckCircleIcon style={{ color: '#66FF99' }} />
              <h2>Este BU foi verificado corretamente</h2>
            </div>
            <div className="text-gray text-sm mb-4">Ele está presente na árvore e não pode ser modificado</div>
          </div>

          <h2 className='text-center  text-md relative font-sans font-bold text-yellow underline cursor-pointer' onClick={navigateToInclusion}>Saiba Mais</h2>
        </div>

        <div className="text-sm  font-bold text-gray">

          <div className="mb-3">
            <strong className='text-blue-light'>BU:</strong>
            <div>Hash: {buHash}</div>
          </div>

          <div className="mb-3">
            <strong className='text-blue-light'>Raiz Global:</strong>
            <div>Hash: {lastRoot.value}</div>
            <div>Gerado em: {lastRoot.timestamp}</div> 
          </div>

          
        </div>

        <div className="flex gap-4">
            <button onClick={downloadJson} className="rounded-full bg-yellow px-2 h-[37px] w-[132px] font-bold">Baixar Provas</button>
        </div>
      </div>
    </div>
  );
};

export default InclusionCheckCard;
