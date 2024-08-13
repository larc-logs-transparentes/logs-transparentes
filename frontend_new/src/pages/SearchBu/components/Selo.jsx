import React, { useEffect, useState } from 'react';
import Correto from '../../../assets/Correto.svg';
import Incorreto from '../../../assets/Incorreto.svg';
import { verifySingleData, getDataProofFromBU } from '../../../services/verifications.js';
import { getTrustedRoot } from '../../../endpoints/merkletree.api.js';
import InclusionCheckCard from './InclusionCheckCard';
import ErrorBu from './ErrorBu'; 

export default function Selo({ id, bu }) {
  const [isProofTrue, setIsProofTrue] = useState("(loading...)");
  const [isInclusionCheckCardModalOpen, setIsInclusionCheckCardModalOpen] = useState(false);
  const [isErrorBuModalOpen, setIsErrorBuModalOpen] = useState(false); 

  useEffect(() => {
    const run = async () => {
      const buInteiro = JSON.stringify(bu["bu"]);
      const proof = await getDataProofFromBU(bu);
      const root = await getTrustedRoot();

      const proofStatus = await verifySingleData(buInteiro, proof, root);
      console.log(proofStatus);
      setIsProofTrue(proofStatus);
    };
    run();
  }, [id]);

  const handleModalToggle = () => {
    if (isProofTrue === 'True') {
      setIsInclusionCheckCardModalOpen(!isInclusionCheckCardModalOpen);
    } else if (isProofTrue === 'False') {
      setIsErrorBuModalOpen(!isErrorBuModalOpen);
    }
  };

  return (
    <>
      <div onClick={handleModalToggle} className="cursor-pointer">
        <p>
          <img
            src={isProofTrue === 'True' ? Correto : Incorreto} 
            alt={isProofTrue === 'True' ? "Verificação Correta" : "Erro na Verificação"}
            className=""
          />
        </p>
      </div>
      {isInclusionCheckCardModalOpen && <InclusionCheckCard id={id} closeModal={() => setIsInclusionCheckCardModalOpen(false)} />}
      {isErrorBuModalOpen && <ErrorBu id={id} closeModal={() => setIsErrorBuModalOpen(false)} />}

    </>
  );
}
