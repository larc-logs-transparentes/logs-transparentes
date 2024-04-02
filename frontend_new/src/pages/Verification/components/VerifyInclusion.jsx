import React, { useState, useEffect } from 'react';
import { getBuById } from '../../../endpoints/bu.api';

import { useParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function VerifyInclusion({}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [buData, setBuData] = useState(null);

  useEffect(() => {
    const fetchBu = async () => {
      if (id) {
        const bu = await getBuById(id);
        const buInteiroParsed = JSON.parse(bu.bu_inteiro);
        setBuData(buInteiroParsed);
      }
    };

    fetchBu();
  }, [id]);

  function downloadJson() {
    const json = JSON.stringify(buData, null, 2);
    const blob = new Blob([json], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'buData.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!buData) {
    return <div>Loading...</div>;
  }


  return (
    <div className="flex items-center justify-center p-8">
    <div className='w-[80vw] md2:w-[892px] md2:h-[403px] justify-center border-2 border-blue-light rounded-2xl p-5 space-y-4'> 
        <h2 className="text-lg font-bold mb-4 text-gray-800">Verificação de inclusão de BU</h2>
        <div className='flex gap-8'>
          
          <div className="font-bold mb-4 text-blue-light flex items-center gap-2">
            <CheckCircleIcon style={{ color: '#66FF99' }} />
            <h2>O bu foi verificado corretamente</h2>
          </div>
        </div>

      </div>
    </div>

  );
}

export default VerifyInclusion;
