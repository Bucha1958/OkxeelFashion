import React, { useState, useEffect } from 'react';
import '../Hero.css';
import SidebarContact from './SidebarContact';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const smoothSliding = (e) => {
    e.preventDefault();
    const nextSection = document.querySelector('#next-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const updateScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 1024);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Initial check for scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  return (
    <div className="relative h-screen flex flex-col justify-center items-center">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-75"></div>
      <div className={`absolute bottom-[140px] ${scrolled ? '' : 'z-10'}`}>
        <button
          className="bg-white text-black text-xxs montserrat-one font-bold py-4 px-6 shadow-lg border-none"
          onClick={isSmallScreen ? toggleSidebar : smoothSliding}
        >
          {isSmallScreen ? 'CONTACT US' : 'EXPLORE THE COLLECTION'}
        </button>
      </div>
      <SidebarContact isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && (
        <div
          className="fixed inset-0 transition-opacity z-30"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Hero;
