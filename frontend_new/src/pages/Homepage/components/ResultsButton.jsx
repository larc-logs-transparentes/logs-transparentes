import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResultsButton = () => {

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/resultadosUSP'); 
  };

  return (
    <div className="flex flex-col justify-center items-center h-[25vh]">
      <p className="text-blue-dark text-center text-3xl">
          Resultados USP
      </p>
      <p className="mb-4 text-blue-dark text-center text-lg font-semibold">
        Confira os resultados usando BUs verificados pela USP
      </p>
      <button 
      onClick={handleButtonClick}
      className="bg-yellow text-black font-bold py-2 px-4 rounded-3xl">
        Calcular Resultado
      </button>
    </div>
  );
};

export default ResultsButton;
