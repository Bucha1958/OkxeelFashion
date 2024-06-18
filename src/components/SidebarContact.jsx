import React from 'react';
import { FaPhoneAlt, FaWhatsapp, FaComments } from 'react-icons/fa';
import '../Hero.css';
import { Link } from 'react-router-dom';

const SidebarContact = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed top-0 right-0 h-full w-5/12 bg-white z-30 text-black transition-transform transform duration-700 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <button className="absolute top-4 right-4 text-2xl" onClick={toggleSidebar}>
        &times;
      </button>
      <div className="mt-16 ml-[70px] flex flex-col  space-y-8 font-poppins text-sm">
        <h2 className="text-2xl font-normal">CONTACT US</h2>
        <div>
          <div className='flex space-x-2 font-semibold'>
            <span className="text-sm flex items-center justify-center"><FaPhoneAlt className="mr-4" /> CALL US</span>
            <p>+234-802-861-2600</p>
          </div>
          <div className='mt-3 text-xxs'>
            <p>Monday - Saturday from 9 AM to 11 PM (WAT).</p>
            <p>Sunday from 10 AM to 9 PM (WAT).</p>
          </div>
        </div>
        <div>
          <div className='flex space-x-2 font-semibold hover:underline'>
          <a 
            href="https://wa.me/08028612600" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <h3 className="text-sm flex items-center justify-center"><FaWhatsapp className="mr-4" /> WHATSAPP US</h3>
          </a>
          </div>
          <div className='mt-3 text-xxs'>
            <p>Monday - Saturday from 9 AM to 8 PM (WAT).</p>
            <p>Sunday from 10 AM to 7 PM (WAT).</p>
          </div>
          
        </div>
        <div className="mt-8">
          <p className="font-semibold">Do you need further assistance?</p>
          <button className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"><Link to="/frequently_asked_questions">FAQs</Link></button>
        </div>
      </div>
      <div className="mt-16 ml-[70px] flex flex-col  space-y-6 font-poppins text-sm">
        <a href="#blog" className="text-lg hover:underline">BLOG</a>
        <a href="#about-us" className="text-lg hover:underline">ABOUT US</a>
      </div>
    </div>
  );
};

export default SidebarContact;
