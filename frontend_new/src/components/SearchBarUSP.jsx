import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import axios from 'axios';

function SearchBarUSP() {
  const bu_api_url = require('../config.json').bu_api_url;
  const [dropdownStates, setDropdownStates] = useState({
    estado: false,
    cidade: false,
    zona: false,
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
  const location = useLocation();
  const { electionId } = useParams();
  const navigate = useNavigate();

  const fetchUFOptions = () => {
    axios.get(`${bu_api_url}/bu/distinct_uf`)
      .then(response => setUfOpts(response.data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchUFOptions();
  }, []);

  const handleChangeUF = (e) => {
    const selectedUF = e.target.value;
    setUfSelection(selectedUF);
    axios.get(`${bu_api_url}/bu/distinct_municipio?UF=${selectedUF}`)
      .then(response => {
        setCityOpts(response.data);
        setDropdownStates(prev => ({ ...prev, cidade: true }));
      })
      .catch(error => console.error(error));
  };

  const handleChangeCity = (e) => {
    const selectedCity = e.target.value;
    setCitySelection(selectedCity);
    axios.get(`${bu_api_url}/bu/distinct_zona?UF=${ufSelection}&municipio=${selectedCity}`)
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

  return (
    <div className='relative'>
      {/* Overlay div */}
      <div className='absolute inset-0 bg-black-30 md:bg-black md:bg-opacity-0 hover:bg-black-30 z-20 cursor-not-allowed'></div>
      <div className='font-sans relative z-10 bg-white p-2 md:p-0'>
        <div className='flex flex-col md2:min-h-[234px] min-h-[500px] h-[13.5vh] place-content-center '>
          <p className='text-blue text-center text-2xl font-bold'>
            Conferir o resultado usando BUs verificados pela USP
          </p>
          <p className='text-blue mt-1 text-center text-xl '>
            Calcule você mesmo o resultado da eleição.
          </p>
          <ul className='flex flex-col md2:flex-row md2:gap-4 mt-[16px] gap-4 items-center justify-center text-base'>
            <div>
              <p className='text-blue-light text-sm font-medium'>Estado</p>
              <li className='bg-white p-1 border-blue-light border-2 rounded-xl md2:text-base text-sm text-center h-[35px] w-[128px] flex font-medium' onClick={() => toggleDropdown('estado')}>
                <p className='whitespace-nowrap overflow-hidden w-[90%]'>
                  {ufSelection || 'São Paulo'}
                </p>
                <ArrowDropDownIcon className='' style={{ transform: dropdownStates.estado ? 'rotate(180deg)' : 'rotate(0)' }} />
                {dropdownStates.estado && (
                  <ul className='absolute bg-white border rounded max-h-[100%] overflow-auto custom-scrollbar mt-[3vh]'>
                    {ufOpts.map((uf, index) => (
                      <li key={index} className='p-2 hover:bg-light-gray cursor-pointer w-[10vw]' onClick={() => handleChangeUF({ target: { value: uf } })}>
                        {uf}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </div>
            <div>
              <p className='text-blue-light text-sm font-medium'>Cidade</p>
              <li className='bg-white p-1 border-blue-light border-2 rounded-xl md2:text-base text-sm text-center h-[35px] w-[128px] flex font-medium' onClick={() => toggleDropdown('cidade')}>
                <p className='whitespace-nowrap overflow-hidden custom-scrollbar w-[90%]'>
                  {'' + citySelection || 'São Paulo'}
                </p>
                <ArrowDropDownIcon className='' style={{ transform: dropdownStates.cidade ? 'rotate(180deg)' : 'rotate(0)' }} />
                {dropdownStates.cidade && (
                  <ul className='absolute bg-white border rounded max-h-[100%] overflow-auto custom-scrollbar mt-[3vh]'>
                    {cityOpts.map((city, index) => (
                      <li key={index} className='p-2 hover:bg-light-gray cursor-pointer w-[13vw]' onClick={() => handleChangeCity({ target: { value: city } })}>
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </div>
            <div>
              <p className='text-blue-light text-sm font-medium'>Cargo</p>
              <div className='flex md2:flex-row gap-4 font-medium'>
                <li className='bg-white p-1 border-blue-light border-2 rounded-xl md2:text-base text-sm text-center h-[35px] w-[122px] flex font-medium' onClick={() => toggleDropdown('zona')}>
                  <p className='whitespace-nowrap overflow-hidden w-[90%]'>
                    {zonaSelection || 'Vereador'}
                  </p>
                  <ArrowDropDownIcon className='' style={{ transform: dropdownStates.zona ? 'rotate(180deg)' : 'rotate(0)' }} />
                  {dropdownStates.zona && (
                    <ul className='absolute bg-white border rounded max-h-[100%] overflow-auto custom-scrollbar mt-[3vh]'>
                      {zonaOpts.map((zona, index) => (
                        <li key={index} className='p-2 hover:bg-light-gray cursor-pointer w-[10vw]' onClick={() => handleChangeZona({ target: { value: zona } })}>
                          {zona}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </div>
            </div>
            <button className="rounded-full font-medium bg-yellow hover:bg-blue-light px-[1px] h-[35px] w-[95px] mt-2 md2:mt-[3vh] mb-[10px]" onClick={handleSearchClick}>
              Pesquisar
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchBarUSP;
