import React, { useState, useEffect } from 'react';
import '../Hero.css';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);

  const smoothSliding = (e) => {
    e.preventDefault();
    const nextSection = document.querySelector('#next-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
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
    <div className="relative h-screen flex flex-col justify-center items-center">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-75"></div>
      <div className="absolute bottom-16">
      <button
          className="bg-white text-black text-xxs montserrat-one font-bold py-4 px-6 shadow-lg"
          onClick={smoothSliding}
        >
          EXPLORE THE COLLECTION
        </button>
      </div>
    </div>
  );
};

export default Hero;
