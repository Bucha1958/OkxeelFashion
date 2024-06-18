
import React from 'react';
import kaftan from '../assets/white kaf.jpg'
import '../Shop.css'; // Assuming you still need this for other styles

export const Shop = () => {
    const backgroundImageUrl = kaftan

    return (
        <div>
        <div
            className="hero-container"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
            <div className="hero-overlay">
            <div className="hero-text">
                <h1>Shop Smarter, Save More Time</h1>
                <p className='text-sm'>
                    Get what you need, delivered fast. Shop online and free up your schedule today!
                </p>
                <button
                    className="mt-8 px-8 py-4 bg-inherit border-2 border-black  text-black text-sm font-bold hover:scale-105 transform transition duration-300"
                >
                    Shop now
                </button>
            </div>
            </div>
        </div>
        </div>
    );
};

