import React, { useState, useRef, useEffect } from 'react';
import Logs from '../assets/LogsW.svg';
import LogoUSP from '../assets/Logousp.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef("");

  const handleSearchClick = () => {
    navigate('/search');
  };   

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleDropdown]);

  return (
    <div className='font-sans relative bg-blue-dark h-[300px] md:h-[217px] w-full'>
  <div className="flex flex-wrap sm:flex-row xl:gap-[15vw] xs:gap-[3vw] lg:gap-[15vw] p-2 relative text-white font-medium text-start items-center justify-between">
    <div className="flex flex-col gap-0 md:gap-2 w-[160px] xs:min-w-[160px] xs:min-h-[50px] ml-[1vh] md:ml-[3vh] mt-[15px] md:mt-[36px]">
      <img src={Logs} className="" alt="logo" />
      <p className="mt-[10px] text-sm md:text-base text-left">Armazenamento transparente dos dados da eleição.</p>
    </div>
    <div className='flex flex-row mt-0 md:mt-10 text-md gap-10 sm:gap-3 md:gap-16 order-last sm:order-none justify-center w-full sm:w-auto'>
      <ul className=''>
        <li className='mt-[15px]'>
          <a href="/" className='text-sm md:text-base'>
            Home
          </a>
        </li>
        <li className='mt-[15px]'>
          <a href="/dashboard" className='text-sm md:text-base'>
            Dashboard
          </a>
        </li>
        <li className='mt-[15px]'>
          <a href="#" className='text-sm md:text-base'>
            Verificar Arquivo
          </a>
        </li>
      </ul>
      
      <ul className=''>
        <li className='mt-[15px] relative'>
          <div onClick={toggleDropdown} className='cursor-pointer flex' ref={dropdownRef}>
            Eleições
            <ExpandMoreIcon className='ml-2' style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}/>
          </div>
          {isDropdownOpen && (
            <ul className="absolute left-1/2 transform -translate-x-1/2 w-[150px] bg-white p-2 border border-gray-300 rounded-md text-black mt-2">
              <li className='text-sm py-1 hover:bg-[#00C6D4] rounded-lg p-1.5'>1° turno</li>
              <li className='text-sm py-1 hover:bg-[#00C6D4] rounded-lg p-1.5'>2° turno</li>
            </ul>
          )}
        </li>
        <li className='mt-[15px]'>
          <a href="#" className='text-sm md:text-base'>
            Dados da Urna
          </a>
        </li>
        <li className='mt-[15px]'>
          <a href="#" className='text-sm md:text-base'>
            Calcular Resultado
          </a>
        </li>
      </ul>
    </div>  
    <img src={LogoUSP} className="h-[58px] mt-3 md:mt-[36px] mr-[1vh] md:mr-[3vh] self-start" alt="logo" />
  </div>
</div>
  );
}

export default Footer;
