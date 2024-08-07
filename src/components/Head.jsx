import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FixedIcons from './FixedIcons';
import ThreeIcons from './ThreeIcons'
import '../Hero.css';
import SidebarContact from './SidebarContact';

export const Head = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  const smoothSliding = (e) => {
    e.preventDefault();
    document.querySelector('#next-section').scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className= "overflow-hidden fixed top-0 w-full z-10 transition duration-0 ease-in-out bg-white text-black h-20 flex items-center justify-between px-4">
        <div className="flex w-full items-center justify-between">
          <div className='items-center space-x-2 text-black gucci-text ml-4 cursor-pointer hidden lg:flex' onClick={toggleSidebar} >
            <FontAwesomeIcon icon={faPlus} />
            <p className='ml-3 font-semibold text-base tracking-wider'>Contact Us</p>
          </div>
          <SidebarContact isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
              onClick={toggleSidebar}
            />
          )}
          <h1
            className='transition-all duration-700 ease-in-out absolute sm:text-xs md:text-2xl lg:text-3xl sm:left-10 md:left-1/2 md:transform md:-translate-x-1/2 spaced-text tracking-widest mt-0'
          >
            <Link to="/">OKXEEL</Link>
          </h1>


          <ThreeIcons />
        </div>
      </header>
    </>
  );
};

export default Head;

