import React, { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleSearchClick = () => {
    navigate('/search');
  };   

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='font-sans relative z-0 font-bold'>
        <div className='flex bg-blue h-[134px] place-content-center '>
        <div className='flex-col'>
        <p className='text-white absolute mt-[22px]'>Escolha o local que deseja verificar</p>
          <ul className='flex gap-[2vw] mt-[16px] items-center text-center justify-center text-base'>
              <li className='bg-white mt-[52px] p-[12px] rounded-xl'>
                  Estado De São Paulo
                  <ExpandMoreIcon className='ml-4' style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}/>
              </li>

              <li className='bg-white mt-[52px] p-[12px] rounded-xl'>
                  Cidade De São Paulo
                  <ExpandMoreIcon className='ml-4' style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}/>
              </li>

              <li className='bg-white mt-[52px] p-[12px] rounded-xl'>
                  Zona 0001
                  <ExpandMoreIcon className='ml-4' style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}/>
              </li>

              <li className='bg-white mt-[52px] p-[12px] rounded-xl'>
                  Seção 0001
                  <ExpandMoreIcon className='ml-4' style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}/>
              </li>

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
