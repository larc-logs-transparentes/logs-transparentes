import React, { useState } from 'react';
import Logs from '../assets/LogsW.svg';
import LogoUSP from '../assets/Logousp.svg';
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
    <div className='font-sans relative bg-blue-dark h-[363px] md:h-[25vh] w-full'>
      <div className="flex flex-col justify-between text-start p-2 font-semibold text-white absolute w-full md:flex-row place-content-center">
        <div className="w-[160px] flex flex-col items-center gap-2 md:mt-[36px] mt-[15px]">
          <img src={Logs} className="h-[38px]" alt="logo" />
          <p className="mt-[10px]">Armazenamento transparente dos dados da eleição.</p>
        </div>

        <ul className='mt-[16px] md:mt-0'>
          <li className='mt-[15px]'>
            <a href="#" className='h-[21px]'>
              Home
            </a>
          </li>
          <li className='mt-[15px]'>
            <a href="#" className='h-[21px]'>
              Dados da Urna
            </a>
          </li>
          <li className='mt-[15px] relative'>
            <div onClick={toggleDropdown} className='cursor-pointer flex items-center justify-center h-[21px] mt-[2px]'>
              Eleições
              <ExpandMoreIcon className='ml-4' style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}/>
            </div>
            {isDropdownOpen && (
              <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white p-2 border border-gray-300 rounded-xl text-black w-[80px]">
                <li>1° turno</li>
                <li>2° turno</li>
              </ul>
            )}
          </li>
          <li className='mt-[15px]'>
            <button className="rounded-full bg-yellow px-2 h-[37px] w-[91px]">Verificar</button>
          </li>
        </ul>
        <img src={LogoUSP} className="h-[58px] mt-[36px]" alt="logo" />
      </div>
    </div>
  );
}

export default Footer;
