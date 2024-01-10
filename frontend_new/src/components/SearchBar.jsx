import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../index.css';


function SearchBar() {

  const bu_api_url = require('../config.json').bu_api_url;
  const navigate = useNavigate();
  const { electionId } = useParams();

  const [dropdownStates, setDropdownStates] = useState({
    turno: false,
    estado: false,
    cidade: false,
    zona: false,
    secao: false,
    id: '1'
  });

  const [turnoSelection, setTurnoSelection] = useState('');
  const [ufSelection, setUfSelection] = useState('');
  const [citySelection, setCitySelection] = useState('');
  const [zonaSelection, setZonaSelection] = useState('');
  const [secaoSelection, setSecaoSelection] = useState('');
  const [turnoOpts, setTurnoOpts] = useState([]);
  const [ufOpts, setUfOpts] = useState([]);
  const [cityOpts, setCityOpts] = useState([]);
  const [zonaOpts, setZonaOpts] = useState([]);
  const [secaoOpts, setSecaoOpts] = useState([]);

  useEffect(() => {
    if (electionId) {
      setTurnoSelection(electionId);
      fetchUFOptions(electionId);
    } else {
      axios.get(`${bu_api_url}/bu/distinct_eleicoes`)
        .then(response => {
          setTurnoOpts(response.data);
        })
        .catch(error => console.error(error));
    }
  }, [electionId]);
  
  const fetchUFOptions = (id) => {
    axios.get(`${bu_api_url}/bu/distinct_uf?id_eleicao=${id}`)
      .then(response => {
        setUfOpts(response.data);
      })
      .catch(error => console.error(error));
  };

  const handleChangeUF = (e) => {
    const selectedUF = e.target.value;
    setUfSelection(selectedUF);
    axios.get(`${bu_api_url}/bu/distinct_municipio?id_eleicao=${turnoSelection}&UF=${selectedUF}`)
      .then(response => {
        setCityOpts(response.data);
        setDropdownStates(prev => ({ ...prev, cidade: true }));
      })
      .catch(error => console.error(error));
  };

  const handleChangeCity = (e) => {
    const selectedCity = e.target.value;
    setCitySelection(selectedCity);
    axios.get(`${bu_api_url}/bu/distinct_zona?id_eleicao=${turnoSelection}&UF=${ufSelection}&municipio=${selectedCity}`)
      .then(response => {
        setZonaOpts(response.data);
        setDropdownStates(prev => ({ ...prev, zona: true })); 
      })
      .catch(error => console.error(error));
  };

  const handleChangeZona = (e) => {
    const selectedZona = e.target.value;
    setZonaSelection(selectedZona);
    axios.get(`${bu_api_url}/bu/distinct_secao?id_eleicao=${turnoSelection}&UF=${ufSelection}&municipio=${citySelection}&zona=${selectedZona}`)
      .then(response => {
        setSecaoOpts(response.data);
        setDropdownStates(prev => ({ ...prev, secao: true }));
      })
      .catch(error => console.error(error));
  };
  
  const handleChangeSecao = (e) => {
    const selectedSecao = e.target.value;
    setSecaoSelection(selectedSecao);
  };

  const toggleDropdown = (name) => {
    setDropdownStates(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSearchClick = () => {
    console.log(turnoSelection, ufSelection, citySelection, zonaSelection, secaoSelection)
    axios.get(`${bu_api_url}/bu/find_by_info?id_eleicao=${turnoSelection}&UF=${ufSelection}&municipio=${citySelection}&zona=${zonaSelection}&secao=${secaoSelection}`)
    .then(response => {
      navigate(`/search/${response.data._id}`);
    })
  };

  return (
    <div className='font-sans relative z-10 font-bold '>
      <div className='flex flex-col bg-blue md2:min-h-[134px] min-h-[329px] h-[13.5vh] place-content-center '>
        <p className='text-white mt-[22px] text-center'>Escolha o local que deseja verificar</p>
        <ul className='flex flex-col md2:flex-row md2:gap-4 mt-[16px] gap-4 items-center justify-center text-base'>
          <li className='bg-white md2:mt-[0px] mt-[32px]  p-[12px] rounded-xl md2:text-base text-sm' onClick={() => toggleDropdown('estado')}>
            {ufSelection || 'Estado'}
            <ExpandMoreIcon className='ml-16 md2:ml-4' style={{ transform: dropdownStates.estado ? 'rotate(180deg)' : 'rotate(0)' }} />
            {dropdownStates.estado && (
              <ul className='absolute bg-white border rounded max-h-[100%] overflow-auto custom-scrollbar'>
                {ufOpts.map((uf, index) => (
                  <li key={index} className='p-2 hover:bg-light-gray cursor-pointer' onClick={() => handleChangeUF({ target: { value: uf } })}>
                    {uf}
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className='bg-white md2:mt-[0px] mt-[32px]  p-[12px] rounded-xl md2:text-base text-sm' onClick={() => toggleDropdown('cidade')}>
            {citySelection || 'Cidade'}
            <ExpandMoreIcon className='ml-16 md2:ml-4' style={{ transform: dropdownStates.cidade ? 'rotate(180deg)' : 'rotate(0)' }} />
            {dropdownStates.cidade && (
              <ul className='absolute bg-white border rounded max-h-[100%] overflow-auto custom-scrollbar'>
                {cityOpts.map((city, index) => (
                  <li key={index} className='p-2 hover:bg-light-gray cursor-pointer' onClick={() => handleChangeCity({ target: { value: city } })}>
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className='bg-white md2:mt-[0px] mt-[32px]  p-[12px] rounded-xl md2:text-base text-sm' onClick={() => toggleDropdown('zona')}>
            {zonaSelection || 'Zona'}
            <ExpandMoreIcon className='ml-16 md2:ml-4' style={{ transform: dropdownStates.zona ? 'rotate(180deg)' : 'rotate(0)' }} />
            {dropdownStates.zona && (
              <ul className='absolute bg-white border rounded max-h-[100%] overflow-auto custom-scrollbar'>
                {zonaOpts.map((zona, index) => (
                  <li key={index} className='p-2 hover:bg-light-gray cursor-pointer' onClick={() => handleChangeZona({ target: { value: zona } })}>
                    {zona}
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className='bg-white md2:mt-[0px] mt-[32px] p-[12px] rounded-xl md2:text-base text-sm' onClick={() => toggleDropdown('secao')}>
            {secaoSelection || 'Seção'}
            <ExpandMoreIcon className='ml-16 md2:ml-4' style={{ transform: dropdownStates.secao ? 'rotate(180deg)' : 'rotate(0)' }} />
            {dropdownStates.secao && (
              <ul className='absolute bg-white border rounded max-h-[100%] overflow-auto custom-scrollbar'>
                {secaoOpts.map((secao, index) => (
                  <li key={index} className='p-2 hover:bg-light-gray cursor-pointer' onClick={(e) => handleChangeSecao({ target: { value: secao } })}>
                    {secao}
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <button className="rounded-full bg-yellow px-[1px] h-[37px] w-[200px] md2:w-[101px] mt-[0px] md2:mb-[0px] mb-[10px]" onClick={handleSearchClick}>
              Pesquisar
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
