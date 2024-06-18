import React from 'react';
import { Link } from 'react-router-dom';
import '../Hero.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {

  const categories = [
    { name: 'Suits', slug: 'suits' },
    { name: 'Natives', slug: 'natives' },
    { name: 'Blazers', slug: 'blazers' },
    { name: 'Coat', slug: 'coat' },
    { name: 'Shirts', slug: 'shirts' },
    { name: 'Shorts', slug: 'shorts' },
    { name: 'Trousers', slug: 'trousers' },
    { name: 'Caps', slug: 'caps' },
  ];

  return (
    <div className={`fixed top-0 right-0 h-full w-5/12 bg-white z-30 text-black duration-700 overflow-y-auto transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <button className="absolute top-4 right-4 text-2xl" onClick={toggleSidebar}>
        &times;
      </button>
      <div className="mt-16 flex flex-col items-center space-y-6 font-semibold">
        {categories.map((category) => (
          <Link key={category.slug} to={`/category/${category.slug}`} className="text-lg" onClick={toggleSidebar}>
            {category.name}
          </Link>
        ))}
      </div>
      <div className='mt-16 flex flex-col items-center space-y-6 font-semibold'>
        <a href="#blog" className="text-lg hover:underline">BLOG</a>
        <a href="#about-us" className="text-lg hover:underline">ABOUT US</a>
      </div>
    </div>
  );
};

export default Sidebar;
