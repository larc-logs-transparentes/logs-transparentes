import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchBar() {
  const bu_api_url = require('../config.json').bu_api_url;
  const navigate = useNavigate();
  const [dropdownStates, setDropdownStates] = useState({
    turno: false,
    estado: false,
    cidade: false,
    zona: false,
    secao: false,
    id: 1
  });
  const [turnoSelection, setTurnoSelection] = useState('');
  const [ufSelection, setUfSelection] = useState('');
  const [zonaSelection, setZonaSelection] = useState('');
  const [turnoOpts, setTurnoOpts] = useState([]);
  const [ufOpts, setUfOpts] = useState([]);
  const [zonaOpts, setZonaOpts] = useState([]);
  const [secaoOpts, setSecaoOpts] = useState([]);

  useEffect(() => {
    axios.get(`${bu_api_url}/bu/distinct_turno`)
      .then(response => {
        setTurnoOpts(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSearchClick = () => {
    navigate(`/search/${dropdownStates.id}`);
  };

  const handleChangeTurn = (e) => {
    const selectedTurno = e.target.value;
    setTurnoSelection(selectedTurno);

    axios.get(`${bu_api_url}/bu/distinct_uf?turno=${selectedTurno}`)
      .then(response => {
        setUfOpts(response.data);
        setDropdownStates(prev => ({ ...prev, estado: true }));
      })
      .catch(error => console.error(error));
  };

  const handleChangeUF = (e) => {
    const selectedUF = e.target.value;
    setUfSelection(selectedUF);

    axios.get(`${bu_api_url}/bu/distinct_zona?turno=${turnoSelection}&UF=${selectedUF}`)
      .then(response => {
        setZonaOpts(response.data);
        setDropdownStates(prev => ({ ...prev, cidade: true }));
      })
      .catch(error => console.error(error));
  };

  const toggleDropdown = (name) => {
    setDropdownStates(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className='font-sans relative z-10 font-bold'>
      <div className='flex flex-col bg-blue md2:min-h-[134px] min-h-[329px] h-[13.5vh] place-content-center '>
        <p className='text-white mt-[22px] text-center'>Escolha o local que deseja verificar</p>
        <ul className='flex flex-col md2:flex-row md2:gap-4 mt-[16px] gap-4 items-center text-center justify-center text-base'>
          <li className='bg-white md2:mt-[0px] mt-[32px] p-[12px] rounded-xl md2:text-base text-sm' onClick={() => setDropdownStates({ ...dropdownStates, turno: !dropdownStates.turno })}>
          Turno
          <ExpandMoreIcon className='ml-16 md2:ml-4' style={{ transform: dropdownStates.turno ? 'rotate(180deg)' : 'rotate(0)' }} />
          {dropdownStates.turno && (
            <ul className='absolute bg-white border rounded'>
              {turnoOpts.map((turno, index) => (
                <li key={index} className='p-2 hover:bg-gray-200' onClick={() => handleChangeTurn({ target: { value: turno } })}>
                  {turno}
                </li>
              ))}
            </ul>
          )}
        </li>
          <li className='bg-white md2:mt-[0px] mt-[32px]  p-[12px] rounded-xl md2:text-base text-sm' onClick={() => toggleDropdown('estado')}>
            Estado De São Paulo
            <ExpandMoreIcon className='ml-16 md2:ml-4' style={{ transform: dropdownStates.estado ? 'rotate(180deg)' : 'rotate(0)' }} />
            {dropdownStates.estado && (
              <ul className='absolute bg-white border rounded'>
                {ufOpts.map((uf, index) => (
                  <li key={index} className='p-2 hover:bg-gray-200' onClick={() => handleChangeUF({ target: { value: uf } })}>
                    {uf}
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className='bg-white md2:mt-[0px] mt-[32px] p-[12px] rounded-xl md2:text-base text-sm' onClick={() => setDropdownStates({ ...dropdownStates, estado: !dropdownStates.estado })}>
          Estado
          <ExpandMoreIcon className='ml-16 md2:ml-4' style={{ transform: dropdownStates.estado ? 'rotate(180deg)' : 'rotate(0)' }} />
          {dropdownStates.estado && (
            <ul className='absolute bg-white border rounded'>
              {ufOpts.map((uf, index) => (
                <li key={index} className='p-2 hover:bg-gray-200' onClick={() => handleChangeUF({ target: { value: uf } })}>
                  {uf}
                </li>
              ))}
            </ul>
          )}
        </li>
          {/* Search Button */}
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
