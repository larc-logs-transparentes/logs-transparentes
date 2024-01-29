import React, { useState,useEffect } from 'react';
import { getBuById } from '../../../endpoints/bu.api';
import { useParams } from 'react-router-dom';


function Result() {
  const { id } = useParams(); // Extract id from URL
  const [buData, setBuData] = useState(null);
  useEffect(() => {
    const fetchBu = async () => {
      if (id) {
        const bu = await getBuById(id);
        const buInteiroParsed = JSON.parse(bu.bu_inteiro);
        setBuData(buInteiroParsed);
      }
    };

    fetchBu();
  }, [id]);


  if (!buData) {
    return <div>Loading...</div>;
  }
  const comparecimento = buData.resultadosVotacaoPorEleicao[1].resultadosVotacao[0].qtdComparecimento;
  const cargo= buData.resultadosVotacaoPorEleicao[1].resultadosVotacao[0].totaisVotosCargo[0].codigoCargo[1];
  const id_eleicao=  buData.resultadosVotacaoPorEleicao[1].idEleicao;
  const eleitoresAptos=buData.resultadosVotacaoPorEleicao[1].qtdEleitoresAptos;

  const votos = buData.resultadosVotacaoPorEleicao[1].resultadosVotacao[0].totaisVotosCargo[0].votosVotaveis;
  const votosNominais = votos.filter(voto => voto.tipoVoto === 'nominal');
  const votosBrancos = votos.find(voto => voto.tipoVoto === 'branco')?.quantidadeVotos || 0;
  const votosNulos = votos.find(voto => voto.tipoVoto === 'nulo')?.quantidadeVotos || 0;
  const totalVotos = votosNominais.reduce((acc, voto) => acc + voto.quantidadeVotos, 0);
  const totalVotosNominais = votosNominais.reduce((acc, voto) => acc + voto.quantidadeVotos, 0);
  console.log(votos)

  return (
    <div className="flex items-center justify-center">
      <div className='w-[80vw] md2:w-[892px] md2:min-h-[403px] justify-center border-2 border-blue-light rounded-2xl p-5 space-y-4'> 

        <h1 className='text-black text-lg font-bold'>Eleição {id_eleicao}</h1>
        <h2 className='text-black text-xl font-bold mb-4 capitalize'>{cargo}</h2>

        <div className='grid md2:grid-cols-3 grid-cols-2  gap-y-12'>

        {votosNominais.map((voto, index) => (
          <div key={index} className='flex gap-x-8 gap-y-4'>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Candidato</h1>
              <h1 className='text-blue-light text-xs font-bold'>{voto.identificacaoVotavel.codigo}</h1>
            </div>
            <div className='space-y-2'>
              <h1 className='text-gray text-xs font-bold'>Numero de Votos</h1>
              <h1 className='text-blue-light text-xs font-bold'>{voto.quantidadeVotos}</h1>
            </div>
          </div>
        ))}
        <div className='space-y-2'>
          <h1 className='text-gray text-xs font-bold'>Votos em branco</h1>
          <h1 className='text-blue-light text-xs font-bold'>{votosBrancos}</h1>
        </div>
        <div className='space-y-2'>
          <h1 className='text-gray text-xs font-bold'>Votos nulos</h1>
          <h1 className='text-blue-light text-xs font-bold'>{votosNulos}</h1>
        </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Eleitores Aptos</h1>
            <h1 className='text-blue-light text-xs font-bold'>{eleitoresAptos}</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Comparecimento</h1>
            <h1 className='text-blue-light text-xs font-bold'>{comparecimento}</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Votos nominais</h1>
            <h1 className='text-blue-light text-xs font-bold'>{totalVotosNominais}</h1>
          </div>
          <div className='space-y-2'>
            <h1 className='text-gray text-xs font-bold'>Total apurado</h1>
            <h1 className='text-blue-light text-xs font-bold'>{totalVotos + votosBrancos + votosNulos}</h1>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Result;
