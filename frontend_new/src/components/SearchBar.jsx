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
    id:1
  });

  const handleSearchClick = () => {
    navigate(`/search/${dropdownStates.id}`);
  };

  const toggleDropdown = (key) => {
    setDropdownStates({
      ...dropdownStates,
      [key]: !dropdownStates[key]
    });
  };

  const renderDropdownItems = (key) => (
    dropdownStates[key] && (
      <ul className="absolute grid gap-2 mt-2 bg-white p-2 border border-gray-300 rounded-xl">
        <li>{key} Item 1</li>
        <li>{key} Item 2</li>
        <li>{key} Item 3</li>
        <li>{key} Item 4</li>
      </ul>
    )
  );

  return (
    <div className='font-sans relative z-10 font-bold'>
      <div className='flex flex-col bg-blue md2:min-h-[134px] min-h-[329px] h-[13.5vh] place-content-center '>
        <p className='text-white mt-[22px] text-center'>Escolha o local que deseja verificar</p>
        <ul className='flex flex-col md2:flex-row md2:gap-4 mt-[16px] gap-4 items-center text-center justify-center text-base'>
          <li className='bg-white md2:mt-[0px] mt-[32px]  p-[12px] rounded-xl md2:text-base text-sm'>
            Estado De São Paulo
            <ExpandMoreIcon 
              className='ml-16 md2:ml-4' 
              style={{ transform: dropdownStates.estado ? 'rotate(180deg)' : 'rotate(0)' }}
              onClick={() => toggleDropdown('estado')} 
            />
            {renderDropdownItems('estado')}
          </li>
          <li className='bg-white md2:mt-[0px]  p-[12px] rounded-xl  md:text-base text-sm'>
            Cidade De São Paulo
            <ExpandMoreIcon 
              className='ml-16 md:ml-4' 
              style={{ transform: dropdownStates.cidade ? 'rotate(180deg)' : 'rotate(0)' }}
              onClick={() => toggleDropdown('cidade')} 
            />
            {renderDropdownItems('cidade')}
          </li>
          <div className='flex gap-2'>
            <li className='bg-white md2:mt-[0px] p-[12px] rounded-xl md2:text-base text-sm'>
              Zona 0001
              <ExpandMoreIcon 
                className='ml-4 md2:ml-4' 
                style={{ transform: dropdownStates.zona ? 'rotate(180deg)' : 'rotate(0)' }}
                onClick={() => toggleDropdown('zona')} 
              />
              {renderDropdownItems('zona')}
            </li>
            <li className='bg-white md2:mt-[0px] p-[12px] rounded-xl md2:text-base text-sm'>
              Seção 0001
              <ExpandMoreIcon 
                className='ml-4 md2:ml-4' 
                style={{ transform: dropdownStates.secao ? 'rotate(180deg)' : 'rotate(0)' }}
                onClick={() => toggleDropdown('secao')} 
              />
              {renderDropdownItems('secao')}
            </li>
          </div>
          <li>
            <button 
              className="rounded-full bg-yellow px-[1px] h-[37px] w-[200px] md2:w-[101px] mt-[0px] md2:mb-[0px] mb-[10px]" 
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
