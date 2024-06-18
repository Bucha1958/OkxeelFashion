import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
    const [isSuitsDropdownOpen, setIsSuitsDropdownOpen] = useState(false);
    const navbarRef = useRef(null);
    const productsDropdownRef = useRef(null);

    const handleProductsDropdownToggle = () => {
        setIsProductsDropdownOpen(!isProductsDropdownOpen);
        setIsSuitsDropdownOpen(false);
    };

    const handleSuitsDropdownToggle = () => {
        setIsSuitsDropdownOpen(!isSuitsDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            setIsProductsDropdownOpen(false);
            setIsSuitsDropdownOpen(false);
        }
    };

    useEffect(() => {
        const navbarElement = document.querySelector('.absolute.top-0.left-0.w-full.p-8.flex.justify-between.items-center.z-20'); // Adjusted selector to match component
        navbarRef.current = navbarElement;
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-20" ref={navbarRef}>
            <div className="flex space-x-6 text-white ml-8 font-poppins">
                <div className="relative" ref={productsDropdownRef}>
                    <a
                        href="#products"
                        className="text-lg relative group cursor-pointer"
                        onClick={handleProductsDropdownToggle}
                    >
                        Products
                       <span className="block absolute left-0 bottom-0 transform translate-y-full w-full h-0.5 bg-transparent group-hover:bg-slate-400 transition-all duration-300 ease-in-out"></span>
                    </a>
                    <div
                        className="absolute left-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg transition-opacity duration-300 ease-in-out z-30"
                        style={{ display: isProductsDropdownOpen ? 'block' : 'none' }}
                    >
                        <div
                            href="#suits"
                            className="block px-4 py-2 hover:bg-slate-200 cursor-pointer"
                            onClick={handleSuitsDropdownToggle}
                        >
                            Suits
                            <div
                                className={`absolute left-full top-0 mt-2 ml-4 w-auto bg-white text-black rounded-lg shadow-lg transition-opacity duration-300 ease-in-out ${isSuitsDropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                            >
                                <div className="flex space-x-6 p-4">
                                    <div className="flex flex-col mx-4">
                                        <h3 className="font-bold">OCCASION</h3>
                                        <a href="#wedding" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">Wedding</a>
                                        <a href="#groomsmen" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">Groomsmen</a>
                                        <a href="#tuxedos" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">Tuxedos</a>
                                        <a href="#dinner" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">Dinner</a>
                                        <a href="#corporate" className="block py-1.5 text-xxs hover:bg-slate-200 my-1 whitespace-nowrap">Corporate & Business</a>
                                        <a href="#partywear" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">Partywear</a>
                                        <a href="#graduation" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">Graduation</a>
                                        <a href="#prom" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">Prom</a>
                                    </div>
                                    <div className="flex flex-col mx-4">
                                        <h3 className="font-bold">STYLES</h3>
                                        <a href="#coat" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">Coat</a>
                                        <a href="#1button" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">1 Button</a>
                                        <a href="#2button" className="block py-1.5 text-xxs hover:bg-slate-200 my-1 whitespace-nowrap">2 Button</a>
                                        <a href="#3button" className="block py-1.5 text-xxs hover:bg-slate-200 my-1 whitespace-nowrap">3 Button</a>
                                        <a href="#safari" className="block py-1.5 text-xxs hover:bg-slate-200 my-1 whitespace-nowrap">Safari</a>
                                        <a href="#doublebreasted" className="block py-1.5 text-xxs hover:bg-slate-200 my-1 whitespace-nowrap">Double Breasted</a>
                                        <a href="#3piece" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">3 Piece</a>
                                        <a href="#2piece" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">2 Piece</a>
                                    </div>
                                    <div className="flex flex-col mx-4">
                                        <h3 className="font-bold">COLOR</h3>
                                        <a href="#black" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">Black</a>
                                        <a href="#blue" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">Blue</a>
                                        <a href="#red" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">Red</a>
                                        <a href="#grey" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">Grey</a>
                                        <a href="#white" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">White/Ivory</a>
                                        <a href="#green" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">Green</a>
                                        <a href="#pink" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">Pink</a>
                                        <a href="#yellow" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">Yellow</a>
                                    </div>
                                    <div className="flex flex-col mx-4">
                                        <h3 className="font-bold">DESIGN</h3>
                                        <a href="#women" className="block py-1.5 text-xxs hover:bg-slate-200 my-1">Women</a>
                                        <a href="#waistcoat" className="block py-1.5 text-xxs hover:bg-slate-200 my-1 whitespace-nowrap">Waist Coat</a>
                                        <a href="#frenchsafari" className="block py-1.5 text-xxs hover:bg-slate-200 my-1 whitespace-nowrap">French Safari</a>
                                        <a href="#arthurrichards" className="block py-1.5 text-xxs hover:bg-slate-200 my-1 whitespace-nowrap">Arthur Richards</a>
                                        <a href="#peakyblinders" className="block py-1.5 text-xxs hover:bg-slate-200 my-1 whitespace-nowrap">Peaky Blinders</a>
                                        <a href="#lacasa" className="block py-1.5 text-xxs hover:bg-slate-200 my-1 whitespace-nowrap">Lacasa De Papel</a>
                                        <a href="#battle" className="block py-1.5 text-xxs hover:bg-slate-200 my-1 whitespace-nowrap">Battle of Stalingrad</a>
                                        <a href="#catchme" className="block py-1.5 text-xxs hover:bg-slate-200 my-1 whitespace-nowrap">Catch Me If You Can</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a href="#natives" className="block px-4 py-2 hover:bg-slate-200">Natives</a>
                        <a href="#shirts" className="block px-4 py-2 hover:bg-slate-200">Shirts</a>
                        <a href="#caps" className="block px-4 py-2 hover:bg-slate-200">Caps</a>
                        <a href="#pants" className="block px-4 py-2 hover:bg-slate-200">Pants</a>
                    </div>
                </div>

                <a href="#contacts" className="text-lg relative group">
                    Contacts
                    <span className="block absolute left-0 bottom-0 transform translate-y-full w-full h-0.5 bg-transparent group-hover:bg-slate-400 transition-all duration-300 ease-in-out"></span>
                </a>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-4xl italic text-white font-semibold">Okxeel</div>
            <div className="flex space-x-6 text-white pr-6">
                <button className="text-lg">
                    <FontAwesomeIcon icon={faSearch} className="w-6 h-6" />
                </button>
                <button className="text-lg">
                    <FontAwesomeIcon icon={faCartShopping} className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

