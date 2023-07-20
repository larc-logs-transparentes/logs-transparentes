import React, { useEffect,useState } from 'react';
import cadVerde from '../../../assets/images/cad-verde.png';
import cadVermelho from '../../../assets/images/cad-vermelho.png';
import { SignedRoot } from '../../../services/SignedRoot';

export default function ProvaDeConsistencia(props) {
  const [isProofTrue, setIsProofTrue] = useState("(loading...)");
  
  useEffect(() => {
    const run = async () => {
      const isProofTrue = await SignedRoot();
      console.log(isProofTrue)
      setIsProofTrue(isProofTrue);
    };
    run();
  }, [props.id]);

  return (
    <div>
      <p>
          {isProofTrue}
      </p>
    </div>
  );
}