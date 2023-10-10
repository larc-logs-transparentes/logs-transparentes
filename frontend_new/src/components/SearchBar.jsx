import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate();
  const [dropdownStates, setDropdownStates] = useState({
    estado: false,
    cidade: false,
    zona: false,
    secao: false,
  });

  const handleSearchClick = () => {
    navigate('/search');
  };   

  const toggleDropdown = (key) => {
    setDropdownStates({
      ...dropdownStates,
      [key]: !dropdownStates[key]
    });
  };

  const renderDropdownItems = (key) => (
    dropdownStates[key] && (
      <ul className="absolute grid gap-2 mt-2 bg-white p-2 border border-gray-300 rounded-xl z-40">
        <li>{key}</li>
        <li>{key}</li>
        <li>{key}</li>
        <li>{key}</li>
      </ul>
    )
  );

  return (
    <div className='font-sans relative z-0 font-bold'>
        <div className='flex bg-blue h-[134px] place-content-center '>
        <div className='flex-col'>
        <p className='text-white absolute mt-[22px]'>Escolha o local que deseja verificar</p>
          <ul className='flex gap-[2vw] mt-[16px] items-center text-center justify-center text-base'>
              {['Estado De São Paulo', 'Cidade De São Paulo', 'Zona 0001', 'Seção 0001'].map((label, index) => (
                <li className='bg-white mt-[52px] p-[12px] rounded-xl' key={index}>
                  {label}
                  <ExpandMoreIcon 
                    className='ml-4' 
                    style={{ transform: dropdownStates[[label]] ? 'rotate(180deg)' : 'rotate(0)' }}
                    onClick={() => toggleDropdown(label)} 
                  />
                  {renderDropdownItems(label)}
                </li>
              ))}

            <button 
              class="rounded-full bg-yellow px-[1px] h-[37px] w-[101px] mt-[52px]" 
              onClick={handleSearchClick}
            >
              Pesquisar
            </button>
          </ul>
        </div>
        </div>
     </div>
  );
}

export default SearchBar;
