import React, { useState, useEffect } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import axios from 'axios';
import '../index.css';

import { useGetStatesByElectionQuery } from '../context/core/api/section/infra/sectionSlice';

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
  const { data, isFetching } = useGetStatesByElectionQuery(545);
  const [cityOpts, setCityOpts] = useState([]);
  const [zonaOpts, setZonaOpts] = useState([]);
  const [secaoOpts, setSecaoOpts] = useState([]);
  const location = useLocation();


  useEffect(() => {
    if (data) {
      setUfOpts(data);
    }
  }, [data]);

  useEffect(() => {
    if (electionId) {
      setTurnoSelection(electionId);
      // fetchUFOptions(electionId);
    } else {
      axios.get(`${bu_api_url}/bu/distinct_eleicoes`)
        .then(response => {
          if (response.data.length > 0) {

            const highestElectionId = response.data.reduce((max, current) => current > max ? current : max, response.data[0]);
            setTurnoSelection(highestElectionId);
            // fetchUFOptions(highestElectionId);
          }
        })
        .catch(error => console.error(error));
    }
  }, [electionId]);

  useEffect(() => {
    const searchState = location.state;
    if (searchState) {
      setTurnoSelection(searchState.turnoSelection);
      setUfSelection(searchState.ufSelection);
      setCitySelection(searchState.citySelection);
      setZonaSelection(searchState.zonaSelection);
      setSecaoSelection(searchState.secaoSelection);
    }
  }, [location]);
  
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
    const effectiveElectionId = electionId || turnoSelection;

    axios.get(`${bu_api_url}/bu/find_by_info?id_eleicao=${effectiveElectionId}&UF=${ufSelection}&municipio=${citySelection}&zona=${zonaSelection}&secao=${secaoSelection}`)
      .then(response => {
        navigate(`/${effectiveElectionId}/search/${response.data._id}`, {
          state: { turnoSelection, ufSelection, citySelection, zonaSelection, secaoSelection }
        });
      })
      .catch(error => console.error(error));
  };
  
  const isHomepage = location.pathname === '/' || /^\d+$/.test(location.pathname.substring(1));
  
  return (
    
    <div className='font-sans relative z-20 '>
      <div className='flex flex-col bg-blue md2:min-h-[218px] min-h-[450px] h-[13.5vh] place-content-center p-2 md:p-0'>
        <p className='text-white text-center text-3xl'>Buscar dados por seções</p>
        {isHomepage && (
          <p className='text-white mt-1 text-center text-xl'>Confira os dados eleitorais armazenados pela USP.</p>
        )}
        <ul className='flex flex-col md2:flex-row md2:gap-8 mt-[16px] gap-4 items-center justify-center text-base'>
        <div>
            <p className='text-white text-sm mb-2'>Estado</p>
          <li className='bg-white p-[5px] rounded-lg md2:text-base text-center text-sm h-[35px] w-[128px] flex' onClick={() => toggleDropdown('estado')}>
            <p className='whitespace-nowrap overflow-hidden w-[90%] font-medium'>
            { ufSelection || 'São Paulo'}</p>
            <ArrowDropDownIcon className='' style={{ transform: dropdownStates.estado ? 'rotate(180deg)' : 'rotate(0)' }} />
            {dropdownStates.estado && (
              <ul className='absolute bg-white border-[1px] border-gray rounded max-h-[100%] w-[115px] overflow-auto custom-scrollbar mt-[4vh]'>
                {ufOpts.map((uf, index) => (
                  <li key={index} className='p-2 hover:bg-light-gray cursor-pointer w-[7vw]' onClick={() => handleChangeUF({ target: { value: uf } })}>
                    {uf}
                  </li>
                ))}
              </ul>
            )}
          </li>
          </div>
          <div>
            <p className='text-white text-sm mb-2'>Cidade</p>
            <li className='bg-white md2:mt-[0px] mt-[5px] p-[6px] rounded-lg md2:text-base text-center text-sm h-[35px] w-[128px] flex' onClick={() => toggleDropdown('cidade')}>
            <p className='whitespace-nowrap overflow-hidden custom-scrollbar w-[90%] font-medium'>
              { citySelection || 'São Paulo'} </p>
              <ArrowDropDownIcon className='' style={{ transform: dropdownStates.cidade ? 'rotate(180deg)' : 'rotate(0)' }} />
              {dropdownStates.cidade && (
                <ul className='absolute bg-white border-[1px] border-gray rounded max-h-[100%] w-[115px] overflow-auto custom-scrollbar mt-[4vh]'>
                  {cityOpts.map((city, index) => (
                    <li key={index} className='p-2 hover:bg-light-gray cursor-pointer w-[7vw]' onClick={() => handleChangeCity({ target: { value: city } })}>
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </div>
          <div className='flex flex-row gap-8'>
            <div>
            <p className='text-white text-sm mb-2'>Zona</p>
              <li className='bg-white p-[6px] rounded-lg md2:text-base text-center text-sm h-[35px] w-[91px] flex' onClick={() => toggleDropdown('zona')}>
              <p className='whitespace-nowrap overflow-hidden font-medium w-[90%]'>
                { zonaSelection || 'Zona'} </p>
                <ArrowDropDownIcon className='' style={{ transform: dropdownStates.zona ? 'rotate(180deg)' : 'rotate(0)' }} />
                {dropdownStates.zona && (
                  <ul className='absolute bg-white border-[1px] border-gray rounded max-h-[100%] w-[77px] overflow-auto custom-scrollbar mt-[4vh]'>
                    {zonaOpts.map((zona, index) => (
                      <li key={index} className='p-2 hover:bg-light-gray cursor-pointer w-[5vw]' onClick={() => handleChangeZona({ target: { value: zona } })}>
                        {zona}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              </div>
              <div>
               <p className='text-white text-sm mb-2'>Seção</p>
              <li className='bg-white md2:mt-[0px] mt-[5px] p-[6px] rounded-lg md2:text-base text-center text-sm h-[35px] w-[94px] flex' onClick={() => toggleDropdown('secao')}>
              <p className='whitespace-nowrap overflow-hidden w-[90%] font-medium'>
                { 'Seção  ' + secaoSelection || 'Seção'} </p>
                <ArrowDropDownIcon className=' ' style={{ transform: dropdownStates.secao ? 'rotate(180deg)' : 'rotate(0)' }} />
                {dropdownStates.secao && (
                  <ul className='absolute bg-white border-[1px] border-gray rounded max-h-[100%] w-[80px] overflow-auto custom-scrollbar mt-[4vh]'>
                    {secaoOpts.map((secao, index) => (
                      <li key={index} className='p-2 hover:bg-light-gray cursor-pointer' onClick={(e) => handleChangeSecao({ target: { value: secao } })}>
                        {secao}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              </div>
            </div>
          <button className="rounded-full bg-yellow hover:bg-blue-light px-[1px] h-[37px] w-[108px] md:mt-6 md2:mb-[0px] mb-[10px] font-medium" onClick={handleSearchClick}>
              Pesquisar
          </button>
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
