import React, { useEffect, useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getBuById } from '../../../endpoints/bu.api';
import { getAllRoots } from '../../../endpoints/merkletree.api';
import { useNavigate } from 'react-router-dom';

const FileVerify = ({ closeModal, bu, isTrue, assinaturaHW, assinaturaSW }) => {
  const [buData, setBuData] = useState(null);
  const [lastRoot, setLastRoot] = useState({ value: '', timestamp: '' });
  const [buHash, setBuHash] = useState('');
  const [id, setId] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [zona, setZona] = useState('');
  const [sessao, setSessao] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBu = async () => {
      if (bu) {
        setId(bu._id);
        console.log(bu);
        const buInteiroParsed = JSON.parse(bu.bu_json);
        setBuData(buInteiroParsed);
        console.log(assinaturaHW, assinaturaSW);
        // Extract the desired fields
        setEstado(bu.UF);
        setCidade(bu.municipio);
        setZona(bu.zona);
        setSessao(bu.secao);

        // Correctly access the hash value
        if (bu.merkletree_info && bu.merkletree_info['545']) {
          setBuHash(bu.merkletree_info['545'].hash);
        }
      }
    };

    const fetchAllRoots = async () => {
      const rootsResponse = await getAllRoots();
      if (rootsResponse.status === 'ok' && rootsResponse.roots.length > 0) {
        const lastRoot = rootsResponse.roots[rootsResponse.roots.length - 1];
        setLastRoot({ value: lastRoot.value, timestamp: formatTimestamp(lastRoot.timestamp),signature: lastRoot.signature});
      }
    };

    fetchBu();
    fetchAllRoots();
  }, [id]);

  function downloadJson() {
    const json = JSON.stringify(buData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'buData.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function navigateToInclusion() {
    navigate(`/inclusion/${id}`);
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleDateString('pt-BR', options);
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur z-30'>
      <div className='relative min-w-[900px] min-h-[620px] border-[2px] border-blue rounded-2xl bg-white p-8 text-sm'>
        <div className="absolute top-3 right-3">
          <HighlightOffIcon onClick={closeModal} className="text-blue cursor-pointer" style={{ width: '32px', height: '32px' }} />
        </div>

        <h2 className="text-lg font-medium mb-4 text-gray-800">Verificação de inclusão de BU</h2>
        <div className='flex gap-8'>
          {isTrue ? (
            <div className="font-medium mb-4 text-blue-light flex items-center gap-2">
              <CheckCircleIcon style={{ color: '#66FF99' }} />
              <h2>A verificação foi bem sucedida!</h2>
            </div>
          ) : (
            <div className="font-medium mb-4 text-red flex items-center gap-2">
              <HighlightOffIcon style={{ color: '#FF6666' }} />
              <h2>Falha na verificação!</h2>
            </div>
          )}
          <h2 className='text-center text-md relative font-sans font-medium text-yellow underline cursor-pointer' onClick={navigateToInclusion}>Saiba Mais</h2>
        </div>

        <div className="text-sm font-medium text-gray ">
          <div className="mb-3">
            <strong className='text-blue-light'>Raiz Global:</strong>
            <div>Hash: {lastRoot.value}</div>
            <div>Gerado em: {lastRoot.timestamp}</div>
          </div>

          <div className="mb-3">
            <strong className='text-blue-light'>BU:</strong>
            <div>Hash: {buHash}</div>
          </div>
        </div>

        <div className="flex gap-4 w-[100%] py-2 font-medium">
          <div className="text-gray flex-col gap-4 border-gray border-[1px] rounded-2xl p-2 w-[50%] h-[20%]">
            <h1 className='text-blue'>Status:</h1>
            <ul>
              <div>Assinatura:</div>
              <div>Inclusão: <span className={isTrue ? 'text-neon-green' : 'text-red'}>{isTrue ? 'Verificação Bem Sucedida' : 'Erro'}</span></div>
            </ul>
          </div>
          <div className="text-gray flex gap-4 font-medium border-gray border-[1px] rounded-2xl p-2 w-[50%]">
            <ul className='flex-col'>
              <h1 className='text-blue'>Dados do arquivo:</h1>
              <div>Tipo: BU</div>
              <div>Estado: {estado}</div>
              <div>Zona: {zona}</div>
            </ul>
            <ul>
              <div>Cidade: {cidade}</div>
              <div>Sessão: {sessao}</div>
            </ul>
          </div>
        </div>

        <div className="">
          <div className="mb-3 border-gray text-gray border-[1px] rounded-2xl p-2 font-medium">
            <ul className='flex flex-col gap-4'>
              <h1 className='text-blue'>Assinatura SW:</h1>
              <div>{assinaturaSW}</div>
              <h1 className='text-blue'>Assinatura HW:</h1>
              <div>{assinaturaHW}</div>
            </ul>
            <div>AC Raiz: AC Urna</div>
          </div>

          <div className="mb-3 text-gray font-medium border-gray border-[1px] rounded-2xl p-2">
            <h1 className='text-blue'>Inclusão:</h1>
            <div>Raiz Global:{lastRoot.value} </div>
            <div>Assinatura da Raiz Global: {lastRoot.signature}</div>
            <div>{lastRoot.timestamp}</div>
          </div>
        </div>

        <div className="flex gap-4 font-medium border-gray border-[1px] rounded-2xl p-2">
          <div className="text-gray">
            <h1 className='font-bold text-blue'>Consistência:</h1>
            <div>USP: Verificação bem sucedida! <a href="#" className="text-yellow underline">+ Detalhes</a></div>
            <div>UNICAMP: Erro na comunicação. <a href="#" className="text-yellow underline">+ Detalhes</a></div>
            <div>OAB: Verificação mal sucedida! <a href="#" className="text-yellow underline">+ Detalhes</a></div>
          </div>
        </div>

        <div className="flex gap-4 mt-4 font-medium">
          <button onClick={downloadJson} className="rounded-full bg-yellow px-2 h-[37px] w-[132px]">Baixar Provas</button>
        </div>
      </div>
    </div>
  );
};

export default FileVerify;
