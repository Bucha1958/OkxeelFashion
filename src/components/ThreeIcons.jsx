import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import '../Hero.css';

const ThreeIcons = ({ scrolled }) => {
  const [iconDropMenu, setIconDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dropdownRef = useRef(null);
  const userIconRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDropDown = () => {
    setIconDropdownOpen(!iconDropMenu);
  }

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current && !dropdownRef.current.contains(event.target) && 
      userIconRef.current && !userIconRef.current.contains(event.target)
    ) {
      setIconDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (iconDropMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleClickOutside);
    };
  }, [iconDropMenu]);

  return (
    <>
      <div className='fixed top-0 right-12 flex justify-end space-x-10 mt-9 ml-15 text-black'>
        <div className='relative'>
          <FontAwesomeIcon icon={faUser} className='cursor-pointer' ref={userIconRef} onClick={toggleDropDown} />
          {iconDropMenu && (
            <div className="absolute right-[-120px] mt-4 w-48 flex flex-col space-y-6 font-sm font-semibold bg-white text-black rounded-lg shadow-lg transition-transform duration-300 transform translate-y-0 opacity-100"
              ref={dropdownRef}
            >
              <ul className="py-6">
                  <li className="px-4 py-2 hover:bg-gray-200"><Link to="/register">SIGN UP</Link></li>
                  <li className="px-4 py-2 hover:bg-gray-200"><Link to="/login">LOGIN</Link></li>    
              </ul>
            </div>
          )}
        </div>
        <FontAwesomeIcon icon={faSearch} />
        <FontAwesomeIcon icon={faBars} className='cursor-pointer' onClick={toggleSidebar} />
      </div>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default ThreeIcons;
