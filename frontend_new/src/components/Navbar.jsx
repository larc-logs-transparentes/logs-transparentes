import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Logs from '../assets/Logs.svg';
import { Link } from 'react-router-dom';  // Import the Link component

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='font-sans relative z-30'>
      <div className='bg-yellow h-[8px]'></div>
      <div className='bg-blue-light h-[8px]'></div>
      <div className='bg-blue h-[37px]'></div>
      <div className="flex xl:gap-[45vw] gap-[10vw] md:gap-[30vw]  p-2 font-semibold relative bg-white">
        <div className="flex ml-20">
          <Link to="/">  
            <img src={Logs} className="w-[160px] h-[38px]" alt="logo" />
          </Link>
        </div>
        <ul className='flex ml-1 gap-[15px] z-30'>
          <li className=' mt-[5px]'>
            <Link to="/" className='h-[21px]'>  {/* Replace the a tag with Link component */}
              Home
            </Link>
            <div className='bg-yellow h-[3px]'></div>
          </li>
          <li className=' mt-[5px]'>
            <a href="#" className='h-[21px]'>
              Dados da Urna
            </a>
          </li>
          <li className=' mt-[5px]'>
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
          <button className="rounded-full bg-yellow px-2 h-[37px] w-[91px]">Verificar</button>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
