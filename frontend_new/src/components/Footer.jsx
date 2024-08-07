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
      <div className="flex flex-col gap-[30%] text-start p-2 font-medium text-white absolute w-full md:flex-row place-content-center">
        <div className="w-[160px] flex flex-col items-center gap-2 md:mt-[36px] mt-[15px]">
          <img src={Logs} className="h-[38px]" alt="logo" />
          <p className="mt-[10px]">Armazenamento transparente dos dados da eleição.</p>
        </div>
        <div className='flex flex-row mt-12 text-md gap-16'>
          <ul className='mt-[16px] md:mt-0'>
            <li className='mt-[15px]'>
              <a href="#" className='h-[21px]'>
                Home
              </a>
            </li>
            <li className='mt-[15px]'>
              <a href="#" className='h-[21px]'>
                Dashboard
              </a>
            </li>
            <li className='mt-[15px]'>
              <a href="#" className='h-[21px]'>
                Verificar Arquivo
              </a>
            </li>
          </ul>
          
          <ul className='mt-[16px] md:mt-0'>
          <li className='mt-[15px] relative'>
              <div onClick={toggleDropdown} className='cursor-pointer flex items-center justify-center h-[21px] mt-[2px]'>
                Eleições
                <ExpandMoreIcon className='ml-4' style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}/>
              </div>
              {isDropdownOpen && (
                <ul className="absolute left-1/2 transform -translate-x-1/2 w-[6vw] bg-white p-2 border-[1px] border-gray rounded text-black mt-[1vh]">
                  <li>1° turno</li>
                  <li>2° turno</li>
                </ul>
              )}
            </li>
            <li className='mt-[15px]'>
              <a href="#" className='h-[21px]'>
                Dados da Urna
              </a>
            </li>
            <li className='mt-[15px]'>
              <a href="#" className='h-[21px]'>
                Calcular Resultado
              </a>
            </li>
          </ul>
        </div>  
        <img src={LogoUSP} className="h-[58px] mt-[36px]" alt="logo" />
      </div>
    </div>
  );
}

export default Footer;
