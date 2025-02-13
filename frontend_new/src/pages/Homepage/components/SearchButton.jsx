import React from 'react';
import { useNavigate } from 'react-router-dom';
import { convertElectionIdToName } from "../../../components/electionIdConverter";
import { useSelector } from 'react-redux';

const ResultsButton = () => {

const { selectedElection, electionOptions } = useSelector(state => state.election);
const navigate = useNavigate();
    const handleButtonClick = () => {
        const electionId = electionOptions.find(
            (option) => convertElectionIdToName(option) === selectedElection
        );
        navigate(`/${electionId}/search`);
    };

  return (
    <div className="flex flex-col bg-blue justify-center items-center h-[25vh]">
      <p className="text-white text-center text-3xl">
      Buscar dados por seções
      </p>
      <p className="mx-4 my-4 text-white text-center text-xl">
      Confira os dados eleitorais armazenados pela USP.
      </p>
      <button 
      onClick={handleButtonClick}
      className="bg-yellow text-black font-bold py-2 px-4 rounded-3xl">
        Pesquisar
      </button>
    </div>
  );
};

export default ResultsButton;
