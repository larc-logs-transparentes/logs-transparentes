import React, { useEffect, useState } from 'react';
import Correto from '../../../assets/Correto.svg';
import Incorreto from '../../../assets/Incorreto.svg';
import { verifySingleData } from '../../../services/verifications.js';
import Certificate from './Certificate';
import ErrorBu from './ErrorBu'; 

export default function Selo({ id }) {
  const [isProofTrue, setIsProofTrue] = useState("(loading...)");
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isErrorBuModalOpen, setIsErrorBuModalOpen] = useState(false); 

  useEffect(() => {
    const run = async () => {
      const proofStatus = await verifySingleData(id);
      console.log(proofStatus);
      setIsProofTrue(proofStatus);
    };
    run();
  }, [id]);

  const handleModalToggle = () => {
    if (isProofTrue === 'True') {
      setIsCertificateModalOpen(!isCertificateModalOpen);
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
      {isCertificateModalOpen && <Certificate id={id} closeModal={() => setIsCertificateModalOpen(false)} />}
      {isErrorBuModalOpen && <ErrorBu id={id} closeModal={() => setIsErrorBuModalOpen(false)} />}

    </>
  );
}
