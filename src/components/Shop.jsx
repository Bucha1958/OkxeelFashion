

import React from 'react';
import kaftan from '../assets/white kaf.jpg';
import '../Shop.css'; // Assuming you still need this for other styles

export const Shop = () => {
    const backgroundImageUrl = kaftan;

    return (
        <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center">
                <h1 className="text-2xl md:text-4xl lg:text-5xl text-white font-bold">Shop Smarter, Save More Time</h1>
                <p className='mt-4 text-sm md:text-base lg:text-lg text-white'>
                    Get what you need, delivered fast. Shop online and free up your schedule today!
                </p>
                <button
                    className="mt-8 px-4 md:px-8 py-2 md:py-4 bg-transparent border-2 border-black text-black text-sm md:text-base font-bold hover:scale-105 transform transition duration-300"
                >
                    Shop now
                </button>
            </div>
        </div>
    );
};
