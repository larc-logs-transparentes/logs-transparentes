import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import Logs from '../assets/LogoPTBR.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../index.css';
import { convertElectionIdToName } from './electionIdConverter';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [electionOptions, setElectionOptions] = useState([]);
  const [selectedElection, setSelectedElection] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const bu_api_url = require('../config.json').bu_api_url;



  useEffect(() => {
    axios.get(`${bu_api_url}/bu/distinct_eleicoes`)
      .then(response => {
        const options = response.data;
        setElectionOptions(options);
        const pathSegments = location.pathname.split('/');
        const electionIdFromUrl = pathSegments[1];
        setHighestElectionAsSelected(options, electionIdFromUrl);
      })
      .catch(error => console.error(error));
  }, [location.pathname]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleVerifyClick = () => {
    const electionId = electionOptions.find(option => convertElectionIdToName(option) === selectedElection);
    navigate(`/${electionId}/search`);
  };

  const setHighestElectionAsSelected = (options, currentId = '') => {
    if (options.length > 0) {
      let selectedID;
      if (currentId && options.includes(parseInt(currentId))) {
        selectedID = currentId;
      } else {
        selectedID = options[options.length - 1];
      }
      const selectedElectionName = convertElectionIdToName(selectedID);
      setSelectedElection(selectedElectionName);
    }
  };

  const handleElectionClick = (electionId) => {
    const electionName = convertElectionIdToName(electionId);
    navigate(`/${electionId}`);
    setSelectedElection(electionName); 
    setIsDropdownOpen(false);
  };
  const handleLogoClick = () => {
    setHighestElectionAsSelected(electionOptions);
  };

  return (
    <div className='font-sans relative'>
      <div className='bg-white absolute font-bold text-blue text-center rounded-b-lg  flex place-content-center w-[50%] 
       md2:w-[44%] ml-[25%] md2:ml-[28%] xl:w-[30%] xl:ml-[35%] md2:h-[4vh] max-h-[8vh] text-sm md:text-base'>
        ATENÇÃO: ESTE É UM PROTÓTIPO EXPERIMENTAL
      </div>

      <div className='bg-yellow h-[1vh]'></div>
      <div className='bg-blue-light h-[1vh]'></div>
      <div className='bg-blue h-[5vh]'></div>
      <div className="flex xl:gap-[35vw] xs:gap-[10vw] md:gap-[15vw] p-2 relative bg-white font-bold items-center">
        <div className="xs:min-w-[160px] xs:min-h-[50px] xs:ml-[10vw] mt-[1vh]">
          <Link to="/" onClick={handleLogoClick}>
            <img src={Logs} className="" alt="logo" />
          </Link>
        </div>
        <ul className='hidden md:flex gap-[1vw] max-h-[10px] items-center justify-center'>
          <li className='mt-[5px]'>
            <Link to="/" className=''>
              Home
            </Link>
          </li>
          <li className='mt-[5px]  overflow-clip '>
            <a href="#" className=''>
              Dados da Urna
            </a>
          </li>
          <li className='mt-[5px]  overflow-clip  '>
            <a className=" cursor-pointer " onClick={handleVerifyClick}>
              Verificar
            </a>
          </li>
          <li className='mt-[5px] overflow-clip '>
            <a href="#" className=''>
              Dados por Sessões
            </a>
          </li>
          <li className='mt-[5px]  overflow-clip '>
            <a href="#" className=''>
              Resultados USP
            </a>
          </li>
          <li className='mt-[5px] relative'>

          <div onClick={toggleDropdown} className='cursor-pointer flex items-center max-h-[50px]'>
              {selectedElection ? `Eleições - ${selectedElection}` : 'Eleições'}
              <ExpandMoreIcon className='ml-4' style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}/>
            </div>
            {isDropdownOpen && (
              <ul className="absolute bg-white border rounded max-h-[300%] overflow-auto custom-scrollbar z-30">
                {electionOptions.map((option, index) => (
                  <li key={index} className='p-2 hover:bg-light-gray cursor-pointer w-[12vw]' onClick={() => handleElectionClick(option)}>
                    {convertElectionIdToName(option)}
                  </li>
                ))}
              </ul>
            )}
          </li>

        </ul>
        <div className="md:hidden w-[10vw]">
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleDropdown} className="p-2 ml-[10vw]">
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
            {electionOptions.map((option, index) => (
            <ul key={index} className="grid gap-2 mt-2 bg-white p-2 border border-gray-300 rounded-xl">
              <li className='hover:bg-light-gray cursor-pointer' onClick={() => handleElectionClick(option)}>
                {convertElectionIdToName(option)}
              </li>
            </ul>
          ))}
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
