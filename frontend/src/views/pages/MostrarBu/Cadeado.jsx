import React, { useEffect,useState } from 'react';
import cadVerde from '../../../assets/images/cad-verde.png';
import cadVermelho from '../../../assets/images/cad-vermelho.png';
import { verifySingleData } from '../../../services/verifications.js';
import LoadingSpinner from '../../../common/components/Spinner/LoadingSpinner';

export default function Cadeado(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isProofTrue, setIsProofTrue] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        const isProofTrueValue = await verifySingleData(props.id);
        setIsProofTrue(isProofTrueValue);
      } catch (error) {
        console.error(error);
        // Handle error here if needed
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [props.id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <p>
        <img
          src={isProofTrue === 'True' ? cadVerde : cadVermelho}
          alt="estado"
        />
      </p>
    </div>
  );
}
