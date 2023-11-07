import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import Logs from '../assets/Logs.svg';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleVerifyClick = () => {
    navigate('/search');
  };

  return (
    <div className='font-sans relative z-30'>
      <div className='bg-yellow h-[8px]'></div>
      <div className='bg-blue-light h-[8px]'></div>
      <div className='bg-blue h-[37px]'></div>
      <div className="flex xl:gap-[45vw] gap-[10vw] md:gap-[30vw] p-2 font-semibold relative bg-white">
      <div className="min-w-[160px] min-h-[38px]">
        <Link to="/">
          <img src={Logs} className="w-[160px] h-[38px]" alt="logo" />
        </Link>
      </div>
        <ul className='hidden md:flex ml-1 gap-[15px] z-30'>
          <li className='mt-[5px]'>
            <Link to="/" className='h-[21px]'>
              Home
            </Link>
            <div className='bg-yellow h-[3px]'></div>
          </li>
          <li className='mt-[5px]'>
            <a href="#" className='h-[21px]'>
              Dados da Urna
            </a>
          </li>
          <li className='mt-[5px]'>
            <div onClick={toggleDropdown} className='cursor-pointer flex items-center h-[21px] mt-[2px]'>
              Eleições
              <ExpandMoreIcon className='ml-4' style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}/>
            </div>
            {isDropdownOpen && (
              <ul className="absolute grid gap-2 mt-2 bg-white p-2 border border-gray-300 rounded-xl z-40">
                <li>1° turno</li>
                <li>2° turno</li>
              </ul>
            )}
          </li>
          <button className="rounded-full bg-yellow px-2 h-[37px] w-[91px]" onClick={handleVerifyClick}>
            Verificar
          </button>
        </ul>
        <div className="md:hidden flex items-center ml-[100px]">
          <button onClick={toggleDropdown} className="p-2">
          <MenuIcon />
          </button>
        </div>
      </div>
      {isDropdownOpen && (
        <ul className="md:hidden grid gap-2 mt-2 bg-white p-2 border border-gray-300 rounded-xl z-40 absolute w-[40%] ml-[55%]">
          <li className='mt-[5px]'>
            <Link to="/" className='h-[21px]'>
              Home
            </Link>
          </li>
          <li className='mt-[5px]'>
            <a href="#" className='h-[21px]'>
              Dados da Urna
            </a>
          </li>
          <li className='mt-[5px]'>
            <div className='flex items-center h-[21px] mt-[2px]'>
              Eleições
            </div>
            <ul className="grid gap-2 mt-2 bg-white p-2 border border-gray-300 rounded-xl">
              <li>1° turno</li>
              <li>2° turno</li>
            </ul>
          </li>
          <button className="rounded-full bg-yellow px-2 h-[37px] w-[91px]" onClick={handleVerifyClick}>
            Verificar
          </button>
        </ul>
      )}
    </div>
  );
}

export default Navbar;
