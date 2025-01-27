import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import Logs from "../assets/LogoPTBR.svg";
import "../index.css";
import { convertElectionIdToName } from "./electionIdConverter";
import { useGetElectionsQuery } from '../context/core/api/section/infra/electionSlice.js';
import { setSelectedElection, setElectionOptions } from '../context/core/api/section/infra/electionSlice.js';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleDropdown]);

  const handleSessionDataClick = () => {
    const electionId = electionOptions.find(
      (option) => convertElectionIdToName(option) === selectedElection
    );
    navigate(`/${electionId}/search`);
  };

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

  const handleLogoClick = () => {
    setHighestElectionAsSelected(electionOptions);
  };

  return (
    <div className="font-sans relative">
      <div
        className="bg-white absolute font-bold text-blue text-center rounded-b-lg flex place-content-center w-[50%] 
       md2:w-[44%] ml-[25%] md2:ml-[28%] xl:w-[30%] xl:ml-[35%] md2:h-[4vh] max-h-[8vh] text-sm md:text-base"
      >
        ATENÇÃO: ESTE É UM PROTÓTIPO EXPERIMENTAL
      </div>

      <div className="bg-yellow h-[1vh]"></div>
      <div className="bg-blue-light h-[1vh]"></div>
      <div className="bg-blue h-[5vh]"></div>
      <div className="flex gap-5 p-2 relative bg-white font-inter font-medium text-base items-center justify-between">
        <div className="xs:min-w-[160px] xs:min-h-[50px] ml-[1vh] md:ml-[3vh] mt-[1vh]">
          <Link to="/" onClick={handleLogoClick}>
            <img src={Logs} className="" alt="logo" />
          </Link>
        </div>
        <ul className="hidden md2:flex gap-[1vw] max-h-[10px] items-center justify-center mr-[3vh]">
          <li className="mt-[5px] hover:bg-[#00C6D4] rounded-lg p-1.5 ">
            <Link to="/" className="">
              Home
            </Link>
          </li>
          <li className="mt-[5px] hover:bg-[#00C6D4] rounded-lg p-1.5 overflow-clip  ">
            <Link to="/dashboard" className="">
              Dashboard
            </Link>
          </li>
          <li className="mt-[5px] hover:bg-[#00C6D4] rounded-lg p-1.5 overflow-clip ">
            <a
              href="#"
              className=" cursor-pointer "
              onClick={handleSessionDataClick}
            >
              Dados por Sessões
            </a>
          </li>
          <li className='mt-[5px] hover:bg-[#00C6D4] rounded-lg p-1.5 overflow-clip '>
            <a href="/resultadosUSP" className=''>
              Resultados USP
            </a>
          </li>

          <li
            className="mt-[5px] relative hover:bg-[#00C6D4] rounded-lg p-1.5"
            ref={dropdownRef}
          >
            <div
              onClick={toggleDropdown}
              className="cursor-pointer flex items-center max-h-[50px]"
            >
              {selectedElection ? `Eleições - ${selectedElection}` : "Eleições"}
              <ExpandMoreIcon
                className="ml-4"
                style={{
                  transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0)",
                }}
              />
            </div>
            {isDropdownOpen && (
              <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-2 justify-center w-[17vw] max-h-[200px] overflow-auto custom-scrollbar z-30">
                {electionOptions.map((option, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-[#00C6D4] cursor-pointer w-[15vw] z-30 rounded-lg"
                    onClick={() => handleElectionClick(option)}
                  >
                    {convertElectionIdToName(option)}
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
        <div className="md2:hidden flex items-center">
          <button
            onClick={toggleDropdown}
            className="p-2 ml-[10vw] mr-[1vh] md:mr-[3vh]"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
      {isDropdownOpen && (
        <ul className="md2:hidden grid gap-2 mt-2 bg-white p-2 border border-gray-300 rounded-xl shadow-lg z-40 absolute w-[40%] ml-[55%]">
          <li className="mt-[5px]">
            <Link to="/" className="h-[21px]">
              Home
            </Link>
          </li>
          <li className="mt-[5px]">
            <Link to="/dashboard" className="h-[21px]">
              Dashboard
            </Link>
          </li>
          <button
            className="flex rounded-full h-[21px]"
            onClick={handleSessionDataClick}
          >
            Dados por seção
          </button>
          <li className="mt-[5px]">
            <div className="flex items-center h-[21px] mt-[2px]">Eleições</div>
            {electionOptions.map((option, index) => (
              <ul
                key={index}
                className="grid gap-2 mt-2 bg-white p-2 border border-gray-300 rounded-xl"
              >
                <li
                  className="hover:bg-[#00C6D4] cursor-pointer rounded-lg"
                  onClick={() => handleElectionClick(option)}
                >
                  {convertElectionIdToName(option)}
                </li>
              </ul>
            ))}
          </li>
        </ul>
      )}
    </div>
  );
}

export default Navbar;