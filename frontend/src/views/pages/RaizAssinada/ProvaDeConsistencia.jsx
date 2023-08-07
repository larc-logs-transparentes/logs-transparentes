import React, { useEffect,useState } from 'react';
import { verifyRootHistoryConsistency } from '../../../services/verifyRootHistoryConsistency';

export default function ProvaDeConsistencia() {
  const [isProofTrue, setIsProofTrue] = useState("(loading...)");
  
  useEffect(() => {
    const run = async () => {
      const isProofTrue = await verifyRootHistoryConsistency();
      console.log(isProofTrue)
      setIsProofTrue(isProofTrue);
    };
    run();
  },[]);

  return (
    <div>
      <p>
          {isProofTrue}
      </p>
    </div>
  );
}