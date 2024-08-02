import React, { useState,useEffect } from 'react';
import { getBuById } from '../../../endpoints/bu.api';
import { useParams } from 'react-router-dom';
import Candidato from '../../../assets/Candidato.svg';
import Votacao from '../../../assets/Votacao.svg';

function Result({ cargo }) { 
  const { id } = useParams(); 
  const [buData, setBuData] = useState(null);

  useEffect(() => {
    const fetchBu = async () => {
      if (id) {
        const bu = await getBuById(id);
        const buInteiroParsed = JSON.parse(bu.bu_json);
        setBuData(buInteiroParsed);
      }
    };

    fetchBu();
  }, [id]);


  if (!buData) {
    return <div>Loading...</div>;
  }

  // const getCargoIndexes = (cargo) => {
  //   switch (cargo) {
  //     case 'presidente':
  //       return { resultadoVotacaoPorEleicaoIndex: 1, resultadoVotacaoIndex: 0, totaisvotosCargoIndex: 0 };
  //     case 'governador':
  //       return { resultadoVotacaoPorEleicaoIndex: 0, resultadoVotacaoIndex: 1,totaisvotosCargoIndex: 1 };
  //     case 'senador':
  //       return { resultadoVotacaoPorEleicaoIndex: 0, resultadoVotacaoIndex: 1,totaisvotosCargoIndex: 0 };
  //     case 'deputado federal':
  //       return { resultadoVotacaoPorEleicaoIndex: 0, resultadoVotacaoIndex: 0,totaisvotosCargoIndex: 0 };
  //     case 'deputado estadual':
  //       return { resultadoVotacaoPorEleicaoIndex: 0, resultadoVotacaoIndex: 0,totaisvotosCargoIndex: 1 };
  //     default:
  //       return { resultadoVotacaoPorEleicaoIndex: 1, resultadoVotacaoIndex: 0, totaisvotosCargoIndex: 0 };
  //   }
  // };
  const colorClasses = [
    'bg-blue-light-30',
    'bg-yellow-30',
    'bg-black-30',
    'bg-red-30',
    'bg-neon-green-30'
  ];

  const getColor = (index) => {
    return colorClasses[index % colorClasses.length]; 
  };

  const getCargoIndexes = (cargo) => {
    switch (cargo) {
      case 'presidente':
        return { resultadoVotacaoPorEleicaoIndex: 0, resultadoVotacaoIndex: 0, totaisvotosCargoIndex: 0 };
      case 'governador':
        return { resultadoVotacaoPorEleicaoIndex: 0, resultadoVotacaoIndex: 0,totaisvotosCargoIndex: 1 };
      default:
        return { resultadoVotacaoPorEleicaoIndex: 0, resultadoVotacaoIndex: 0, totaisvotosCargoIndex: 0 };
    }
  };

  const { resultadoVotacaoPorEleicaoIndex, resultadoVotacaoIndex, totaisvotosCargoIndex } = getCargoIndexes(cargo);

  const comparecimento = buData.resultadosVotacaoPorEleicao[resultadoVotacaoPorEleicaoIndex].resultadosVotacao[resultadoVotacaoIndex].qtdComparecimento;
  const position= buData.resultadosVotacaoPorEleicao[resultadoVotacaoPorEleicaoIndex].resultadosVotacao[resultadoVotacaoIndex].totaisVotosCargo[totaisvotosCargoIndex].codigoCargo[1];
  const id_eleicao=  buData.resultadosVotacaoPorEleicao[resultadoVotacaoPorEleicaoIndex].idEleicao;
  const eleitoresAptos=buData.resultadosVotacaoPorEleicao[resultadoVotacaoPorEleicaoIndex].qtdEleitoresAptos;

  const votos = buData.resultadosVotacaoPorEleicao[resultadoVotacaoPorEleicaoIndex].resultadosVotacao[resultadoVotacaoIndex].totaisVotosCargo[totaisvotosCargoIndex].votosVotaveis;
  const votosNominais = votos.filter(voto => voto.tipoVoto === 'nominal');
  const votosBrancos = votos.find(voto => voto.tipoVoto === 'branco')?.quantidadeVotos || 0;
  const votosNulos = votos.find(voto => voto.tipoVoto === 'nulo')?.quantidadeVotos || 0;
  const totalVotos = votosNominais.reduce((acc, voto) => acc + voto.quantidadeVotos, 0);
  const totalVotosNominais = votosNominais.reduce((acc, voto) => acc + voto.quantidadeVotos, 0);
  
  const addSpacesToPosition = (position) => {
    return position.replace(/([A-Z])/g, ' $1').trim();
}
  const formattedPosition = addSpacesToPosition(position);

  return (
    <div className="flex items-center justify-center">
    <div className='w-[90vw] md2:w-[90vw] md2:min-h-[60vh] justify-center border-2 border-blue-light rounded-2xl p-5 space-y-8'> 

      <h1 className='text-black text-lg font-medium'>Eleição {id_eleicao}</h1>
      <h2 className='text-blue text-2xl font-medium mb-4 capitalize'>{formattedPosition}</h2>

      <div className='grid md2:grid-cols-2 grid-cols-2  gap-y-12 gap-12'>

      {votosNominais.map((voto, index) => (
        <div key={index} className={`flex md:gap-x-40 md:gap-y-4  rounded-xl p-4 border-gray ${getColor(index)} `}>
          <div className='flex gap-8'>
            <img src={Candidato} alt="Candidato" className='h-8'/>
            <div>
              <h1 className='text-gray text-sm font-bold'>Candidato</h1>
              <h1 className='text-blue-light text-sm font-bold'>{voto.identificacaoVotavel.codigo}</h1>
            </div>
          </div>
          <div className='flex gap-8'>
            <img src={Votacao} alt="Votacao" className='h-8 '/>
            <div>
              <h1 className='text-gray text-sm font-bold'>Numero de Votos</h1>
              <h1 className='text-blue-light text-sm font-bold'>{voto.quantidadeVotos}</h1>
            </div>
          </div>
        </div>
      ))}
      </div>
      <div className='grid md2:grid-cols-3 grid-cols-2 gap-y-8  gap-2 '>
        <div className='space-y-2 border-[1px] rounded-xl p-2 border-gray'>
          <h1 className='text-gray text-xs font-bold'>Votos em branco</h1>
          <h1 className='text-blue-light text-xs font-bold'>{votosBrancos}</h1>
        </div>
        <div className='space-y-2 border-[1px] rounded-xl p-2 border-gray'>
          <h1 className='text-gray text-xs font-bold'>Votos nulos</h1>
          <h1 className='text-blue-light text-xs font-bold'>{votosNulos}</h1>
        </div>
        <div className='space-y-2 border-[1px] rounded-xl p-2 border-gray'>
          <h1 className='text-gray text-xs font-bold'>Eleitores Aptos</h1>
          <h1 className='text-blue-light text-xs font-bold'>{eleitoresAptos}</h1>
        </div>
        <div className='space-y-2 border-[1px] rounded-xl p-2 border-gray'>
          <h1 className='text-gray text-xs font-bold'>Comparecimento</h1>
          <h1 className='text-blue-light text-xs font-bold'>{comparecimento}</h1>
        </div>
        <div className='space-y-2 border-[1px] rounded-xl p-2 border-gray'>
          <h1 className='text-gray text-xs font-bold'>Votos nominais</h1>
          <h1 className='text-blue-light text-xs font-bold'>{totalVotosNominais}</h1>
        </div>
        <div className='space-y-2 border-[1px] rounded-xl p-2 border-gray'>
          <h1 className='text-gray text-xs font-bold'>Total apurado</h1>
          <h1 className='text-blue-light text-xs font-bold'>{totalVotos + votosBrancos + votosNulos}</h1>
        </div>
      </div>

    </div>
  </div>
  );
}

export default Result;
