import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';  
import Footer from '../../components/Footer';
import BuHeader from './components/BuHeader';
import BuResult from './components/BuResult';
import { getBuById } from '../../endpoints/bu.api';
import { useParams } from 'react-router-dom';

function SearchBu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [buData, setBuData] = useState(null);
  const [bu, setBu] = useState({ "bu_json": '{}'});
  const { id } = useParams();

  useEffect(() => {
    const fetchBu = async () => {
      if (id) {
        const bu = await getBuById(id);
        if (bu) {
          // TODO: use parsed bu["bu"], insted of bu_json
          const buInteiroParsed = JSON.parse(bu.bu_json);
          setBuData(buInteiroParsed);
          setBu(bu)
          console.log(buInteiroParsed)
        }
      }
    };

    fetchBu();
  }, [id]);

  const renderBuResults = () => {
    return (
      <div>
      {buData.resultadosVotacaoPorEleicao.map((election, index) =>
        election.resultadosVotacao.map((office, index) =>
          office.totaisVotosCargo.map((result, index) => 
            <BuResult buResults={result} 
                      electionId={election.idEleicao} 
                      ableVoters={election.qtdEleitoresAptos}
                      presentVoters={office.qtdComparecimento} />
          )
        )

          
      )}
      </div>
    )
  }


  return (
    <div>
      <SearchBar />
      {buData ? (
        <div className='flex place-content-center p-[20px]'>
          <div className='flex-col items-center space-y-[20px]'>     
            <BuHeader buData={buData} bu={bu}/>
            
            {renderBuResults()}
            
            {/* TODO mostrar outros cargos do BU */}
            {/* <Result cargo="senador" />
            <Result cargo="deputado federal" />
            <Result cargo="deputado estadual" /> */}
          </div>
        </div>
      ) : (
        <div className='h-[500px]'></div>
      )}
      <Footer />
    </div>
  );
}

export default SearchBu;
