import React, { useState, useRef, useEffect } from 'react';
import Logs from '../assets/LogsW.svg';
import LogoUSP from '../assets/Logousp.svg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { convertElectionIdToName } from "./electionIdConverter";
import { useGetElectionsQuery } from '../context/core/api/section/infra/electionSlice.js';
import { setSelectedElection, setElectionOptions } from '../context/core/api/section/infra/electionSlice.js';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef("");
  const dispatch = useDispatch();
  const { selectedElection, electionOptions } = useSelector(state => state.election);
  const { data: options = [], error } = useGetElectionsQuery();

  useEffect(() => {
    if (options.length > 0) {
      dispatch(setElectionOptions(options));
      const pathSegments = location.pathname.split("/");
      const electionIdFromUrl = pathSegments[1];
      const savedElectionId = localStorage.getItem("selectedElection");

      if (savedElectionId) {
        const selectedElectionName = convertElectionIdToName(savedElectionId);
        dispatch(setSelectedElection(selectedElectionName));
      } else {
        setHighestElectionAsSelected(options, electionIdFromUrl);
      }
    }
  }, [options, location.pathname, dispatch]);

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

  const setHighestElectionAsSelected = (options, currentId = "") => {
    if (options.length > 0) {
      let selectedID;
      if (currentId && options.includes(parseInt(currentId))) {
        selectedID = currentId;
      } else {
        selectedID = options[options.length - 1];
      }
      const selectedElectionName = convertElectionIdToName(selectedID);
      dispatch(setSelectedElection(selectedElectionName));
    }
  };

  const handleElectionClick = (electionId) => {
    const electionName = convertElectionIdToName(electionId);
    navigate(`/${electionId}/search`);
    dispatch(setSelectedElection(electionName));
    setIsDropdownOpen(false);
    localStorage.setItem("selectedElection", electionId);
  };

  return (
    <div className='font-sans relative bg-blue-dark h-[330px] md:h-[217px] w-full'>
      <div className="flex flex-wrap md:flex-row p-2 relative text-white font-medium text-start items-center justify-between">
        <div className="flex flex-col gap-0 md:gap-2 w-[160px] xs:min-w-[160px] xs:min-h-[50px] ml-[1vh] md:ml-[3vh] mt-[15px] md:mt-[36px]">
          <img src={Logs} className="" alt="logo" />
          <p className="mt-[10px] text-sm md:text-base text-left">Armazenamento transparente dos dados da eleição.</p>
        </div>
        <div className='flex flex-row mt-0 md:mt-15 text-md gap-8 lg:gap-16 order-last sm:order-none justify-center w-full sm:w-auto'>
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
            <li className='mt-[15px] relative' ref={dropdownRef}>
              <div onClick={toggleDropdown} className='cursor-pointer flex w-[200px] lg:w-auto'>
              {selectedElection ? `Eleições - ${selectedElection}` : "Eleições"}
                <ExpandMoreIcon className='ml-1' style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}/>
              </div>
              {isDropdownOpen && (
                <ul className="absolute left-1/2 transform -translate-x-1/2 w-[200px] md:w-[300px] h-[100px] bg-white p-2 border border-gray-300 rounded-md text-black mt-2 overflow-y-scroll custom-scrollbar overflow-x-hidden">
                  {electionOptions.map((option, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-[#00C6D4] cursor-pointer w-[170px] md:w-[270px] z-30 rounded-lg"
                    onClick={() => handleElectionClick(option)}
                  >
                    {convertElectionIdToName(option)}
                  </li>
                ))}
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