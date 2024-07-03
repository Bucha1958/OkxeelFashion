import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FixedIcons from './FixedIcons';
import '../Hero.css';
import SidebarContact from './SidebarContact';

export const Header = () => {
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
    <header className={`overflow-hidden fixed top-0 w-full z-10 transition duration-0 ease-in-out ${scrolled ? 'bg-white text-black h-20 flex items-center justify-between px-4' : 'bg-transparent h-screen flex flex-col justify-start items-center'}`}>
      <div className="flex w-full items-center justify-between">
        <div 
          className={`cursor-pointer items-center space-x-2 ${scrolled ? 'text-black gucci-text' : 'hidden'} ml-4 ${scrolled ? 'hidden md:flex' : ''}`} 
          onClick={toggleSidebar}
        >
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
          className={`transition-all duration-700 ease-in-out absolute ${scrolled ? 'sm:left-10 md:left-1/2 transform md:-translate-x-1/2' : 'left-1/2 transform -translate-x-1/2'} ${scrolled ? 'spaced-text sm:text-sm md:text-2xl xl:text-2xl tracking-widest mt-0' : 'text-white opacity-60 sm:text-8xl md:text-9xl xl:text-[250px] text-center spaced-text space-wide ml-4'}`}
          style={scrolled ? {} : { marginTop: '70vh' }}
        >
          OKXEEL
        </h1>

        <FixedIcons scrolled={scrolled} />
      </div>
    </header>
  );
};

export default Header;

// import React, { useState, useEffect } from 'react';
// import '../Hero.css';
// import SidebarContact from './SidebarContact';

// const Hero = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const smoothSliding = (e) => {
//     e.preventDefault();
//     const nextSection = document.querySelector('#next-section');
//     if (nextSection) {
//       nextSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const updateScreenSize = () => {
//     setIsSmallScreen(window.innerWidth < 1024);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     // Initial check for scroll position
//     handleScroll();

//     window.addEventListener('scroll', handleScroll);
//     window.addEventListener('resize', updateScreenSize);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       window.removeEventListener('resize', updateScreenSize);
//     };
//   }, []);

//   return (
//     <div className="relative h-screen flex flex-col justify-center items-center">
//       <div className="absolute inset-0 bg-gray-900 bg-opacity-75"></div>
//       <div className="absolute bottom-[140px]">
//         <button
//           className="bg-white text-black text-xxs montserrat-one font-bold py-4 px-6 shadow-lg"
//           onClick={isSmallScreen ? toggleSidebar : smoothSliding}
//         >
//           {isSmallScreen ? 'CONTACT US' : 'EXPLORE THE COLLECTION'}
//         </button>
//       </div>
//       <SidebarContact isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
//           onClick={toggleSidebar}
//         />
//       )}
//     </div>
//   );
// };

// export default Hero;
