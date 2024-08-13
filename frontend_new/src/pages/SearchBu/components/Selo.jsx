import React, { useEffect, useState } from 'react';
import CorrectIcon from '../../../assets/Correto.svg';
import ErrorIcon from '../../../assets/Incorreto.svg';
import LoadingIcon from '../../../assets/loading.png';
import { verifySingleData, getDataProofFromBU } from '../../../services/verifications.js';
import { getTrustedRoot } from '../../../endpoints/merkletree.api.js';
import InclusionCheckCard from './InclusionCheckCard';

export default function Selo({ bu }) {
  const [isProofTrue, setIsProofTrue] = useState("loading");
  const [isInclusionCheckCardModalOpen, setIsInclusionCheckCardModalOpen] = useState(false);
  const [proof, setProof] = useState('');

  useEffect(() => {
    const run = async () => {
      const buBinario = bu["bu"];
      const proof = await getDataProofFromBU(bu);
      const root = await getTrustedRoot();

      const verificationResult = await verifySingleData(buBinario, proof, root);
      setProof(proof);
      setIsProofTrue(verificationResult);
      console.log("Resultado da prova de inclusão:", verificationResult)
    };
    run();
  }, []);

  const handleModalToggle = () => {
    if (isProofTrue === 'True') {
      setIsInclusionCheckCardModalOpen(!isInclusionCheckCardModalOpen);
    } else {
      setIsInclusionCheckCardModalOpen(!isInclusionCheckCardModalOpen);
    }
  };

  const verificationIconRender = () => {
    if (isProofTrue === 'True') {
      return <img src={CorrectIcon} alt="Verificação Correta" className="" />;
    }
    if (isProofTrue === 'loading') {
      return <img src={LoadingIcon} alt="Carregando" className="h-16 w16" />;
    }
    else {
      return <img src={ErrorIcon} alt="Erro na Verificação" className="" />;
    }
  }

  return (
    <>
      <div onClick={handleModalToggle} className="cursor-pointer">
        <p>
          {verificationIconRender()}
        </p>
      </div>
      {isInclusionCheckCardModalOpen && <InclusionCheckCard bu={bu} proof={proof} isProofTrue={isProofTrue} closeModal={() => setIsInclusionCheckCardModalOpen(false)} />}

    </>
  );
}
