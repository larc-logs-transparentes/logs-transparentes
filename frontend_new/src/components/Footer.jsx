import React, { useState } from 'react';
import Logs from '../assets/LogsW.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleSearchClick = () => {
    navigate('/search');
  };   

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='font-sans relative z-30 bg-black h-[205px]'>
    <div className="flex p-2 font-semibold absolute text-white">
      <div className="w-[160px] flex flex-col items-center gap-2 mt-[36px] ml-[138px]">
        <img src={Logs} className="h-[38px]" alt="logo" />
        <p className="mt-[10px] text-center">Armazenamento transparente dos dados da eleição.</p>
      </div>

      <ul className='ml-[208px] z-30'>
        <li className=' mt-[15px]'>
          <a href="#" className='h-[21px]'>
            Home
          </a>
        </li>
        <li className=' mt-[15px]'>
          <a href="#" className='h-[21px]'>
            Dados da Urna
          </a>
        </li>
        <li className=' mt-[15px]'>
          <div onClick={toggleDropdown} className='cursor-pointer flex items-center h-[21px] mt-[2px]'>
            Eleições
            <ExpandMoreIcon className='ml-4' style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}/>
          </div>
          {isDropdownOpen && (
            <ul className="absolute grid gap-2 mt-2 bg-white p-2 border border-gray-300 rounded-xl z-40 text-black">
              <li>1° turno</li>
              <li>2° turno</li>
            </ul>
          )}
        </li>
        <button class="rounded-full bg-yellow px-2 h-[37px] w-[91px] mt-[15px]">Verificar</button>
      </ul>
    </div>
  </div>
  );
}

export default Footer;
