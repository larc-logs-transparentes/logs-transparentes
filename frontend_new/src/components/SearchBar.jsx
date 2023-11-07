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
        <li>{key} Item 1</li>
        <li>{key} Item 2</li>
        <li>{key} Item 3</li>
        <li>{key} Item 4</li>
      </ul>
    )
  );

  return (
    <div className='font-sans relative z-0 font-bold'>
      <div className='flex bg-blue md:h-[134px] place-content-center '>
        <p className='text-white absolute mt-[22px]'>Escolha o local que deseja verificar</p>
        <ul className='flex flex-col md:flex-row md:gap-4 mt-[16px] gap-4 items-center text-center justify-center text-base'>
          <li className='bg-white md:mt-[52px] mt-[42px]  p-[12px] rounded-xl md:text-base text-sm'>
            Estado De São Paulo
            <ExpandMoreIcon 
              className='ml-16 md:ml-4' 
              style={{ transform: dropdownStates.estado ? 'rotate(180deg)' : 'rotate(0)' }}
              onClick={() => toggleDropdown('estado')} 
            />
            {renderDropdownItems('estado')}
          </li>
          <li className='bg-white md:mt-[52px]  p-[12px] rounded-xl  md:text-base text-sm'>
            Cidade De São Paulo
            <ExpandMoreIcon 
              className='ml-16 md:ml-4' 
              style={{ transform: dropdownStates.cidade ? 'rotate(180deg)' : 'rotate(0)' }}
              onClick={() => toggleDropdown('cidade')} 
            />
            {renderDropdownItems('cidade')}
          </li>
          <div className='flex gap-2'>
            <li className='bg-white md:mt-[52px] p-[12px] rounded-xl md:text-base text-sm'>
              Zona 0001
              <ExpandMoreIcon 
                className='ml-4 md:ml-4' 
                style={{ transform: dropdownStates.zona ? 'rotate(180deg)' : 'rotate(0)' }}
                onClick={() => toggleDropdown('zona')} 
              />
              {renderDropdownItems('zona')}
            </li>
            <li className='bg-white md:mt-[52px]  p-[12px] rounded-xl md:text-base text-sm'>
              Seção 0001
              <ExpandMoreIcon 
                className='ml-4 md:ml-4' 
                style={{ transform: dropdownStates.secao ? 'rotate(180deg)' : 'rotate(0)' }}
                onClick={() => toggleDropdown('secao')} 
              />
              {renderDropdownItems('secao')}
            </li>
          </div>
          <li>
            <button 
              className="rounded-full bg-yellow px-[1px] h-[37px] w-[101px] mt-[52px] md:mb-[0px] mb-[10px]" 
              onClick={handleSearchClick}
            >
              Pesquisar
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
