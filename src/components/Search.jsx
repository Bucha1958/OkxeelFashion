import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useExchangeRate } from '../ExchangeRateContext';

const Search = ({ isVisible, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [hovered, setHovered] = useState(false);
    const [liked, setLiked] = useState(false); // Assuming you have a like functionality
    const { convertPrice, currency } = useExchangeRate();
    const API_URL = import.meta.env.VITE_API_BASE_URL

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`${API_URL}/api/products?q=${encodeURIComponent(searchQuery)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error('Failed to fetch search results:', error);
            }
        };

        // Only fetch if there's a search query
        if (searchQuery.trim() !== '') {
            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    return (
        <>
            {isVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}></div>
            )}
            <div
                className={`fixed top-20 left-0 w-full flex justify-center items-start z-50 transition-all duration-500 ${
                    isVisible ? 'opacity-100 visible' : 'opacity-0 invisible -translate-y-full'
                }`}
            >
                <div className="bg-white pb-10 px-10 p rounded-md shadow-md w-[90%] max-w-lg overflow-y-auto max-h-[80vh]">
                    <div className='flex justify-end'>
                        <button onClick={onClose} className="px-4 py-2 text-gray-600 rounded">x</button>
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full p-2 border border-gray-300 rounded bg-inherit focus:outline-none"
                        placeholder="Search..."
                    />
                    {/* Display search results here */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {searchResults.map((product) => (
                            <div key={product._id} className="mt-10">
                                <Link to={`/products/${product._id}`}>
                                    <div
                                        className="relative h-[45vh] md:h-[50vh] w-full p-2 md:p-4 text-black text-base montserrat-one font-medium product-card"
                                        onMouseEnter={() => setHovered(true)}
                                        onMouseLeave={() => setHovered(false)}
                                    >
                                        <div className="relative h-[40vh] md:h-[45vh] mb-2 md:mb-4 overflow-hidden">
                                            <img
                                                src={hovered && product.images[1] ? product.images[1] : product.images[0]}
                                                alt={product.name}
                                                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${hovered ? 'scale-105' : 'scale-100'}`}
                                            />
                                            <FontAwesomeIcon
                                                icon={liked ? solidHeart : regularHeart}
                                                onClick={handleLikeClick}
                                                className={`absolute top-4 right-4 text-xl md:text-2xl cursor-pointer ${liked ? 'text-pink-500' : 'text-white'}`}
                                            />
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <h2 className="text-sm md:text-base font-medium mb-1 md:mb-2">{product.name}</h2>
                                            <p className="text-xs md:text-sm text-gray-700">{convertPrice(product.price)}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;
