import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faSearch, faBars, faSignOutAlt, faCog, faBookmark, faCalendarAlt, faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import '../Hero.css';

const FixedIcons = ({ scrolled }) => {
  const { userInfo, setUserInfo } = useContext(UserContext);
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

    fetch('http://localhost:3000/api/profile', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(userInfo => {
        setUserInfo(userInfo);
      })
      .catch(error => {
        console.error("Error fetching user info:", error);
      });

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
  }, [iconDropMenu, setUserInfo]);

  const Logout = () => {
    fetch('http://localhost:3000/api/logout', {
      credentials: 'include',
      method: 'POST',
    })
      .then(() => {
        setUserInfo(null); // Clear the user info when logging out
      })
      .catch(error => {
        console.error("Error logging out:", error);
      });
  }

  const user = userInfo?.email;

  return (
    <>
      <div className={`fixed top-0 right-12 flex justify-end space-x-10 mt-9 ml-15 ${scrolled ? 'text-black' : 'text-white'}`}>
        <div className='relative'>
          <FontAwesomeIcon icon={faUser} className='cursor-pointer' ref={userIconRef} onClick={toggleDropDown} />
          {iconDropMenu && (
            <div className="absolute right-[-120px] mt-4 w-48 flex flex-col space-y-6 font-sm font-semibold bg-white text-black rounded-lg shadow-lg transition-transform duration-300 transform translate-y-0 opacity-100"
              ref={dropdownRef}
            >
              {/* {user ? (
                <ul className="py-6">
                  <li className="px-4 py-2 hover:bg-gray-200 hover:cursor-pointer"><a onClick={Logout}>LOGOUT</a></li>
                  <li className="px-4 py-2 hover:bg-gray-200"><a href="#">ACCOUNT SETTINGS</a></li>
                  <li className="px-4 py-2 hover:bg-gray-200"><a href="#">SAVED ITEMS</a></li>
                  <li className="px-4 py-2 hover:bg-gray-200"><a href="#">MY APPOINTMENTS</a></li>
                </ul>
              ) : (
                <ul className="py-6">
                  <li className="px-4 py-2 hover:bg-gray-200"><Link to="/register">SIGN UP</Link></li>
                  <li className="px-4 py-2 hover:bg-gray-200"><Link to="/login">LOGIN</Link></li>
                </ul>
              )} */}
              {user ? (
                <ul className="py-6 text-sm">
                  <li className="px-4 py-2 hover:bg-gray-200 hover:cursor-pointer">
                    <FontAwesomeIcon icon={FaShopingCart} className="mr-2" />
                    <a onClick={Logout}>MY ORDER</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <FontAwesomeIcon icon={faCog} className="mr-2" />
                    <a href="#">ACCOUNT SETTINGS</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <FontAwesomeIcon icon={faBookmark} className="mr-2" />
                    <a href="#">SAVED ITEMS</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    <a href="#">MY APPOINTMENTS</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 hover:cursor-pointer">
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    <a onClick={Logout}>LOGOUT</a>
                  </li>
                </ul>
              ) : (
                <ul className="py-6 text-sm">
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    <Link to="/register">SIGN UP</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                    <Link to="/login">LOGIN</Link>
                  </li>
                </ul>
              )}
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

export default FixedIcons;