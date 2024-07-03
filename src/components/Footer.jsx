import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import FAQ from '../pages/FAQ';

const Footer = ({ toggleSidebar }) => {
    return (
        <footer className="bg-black text-slate-300 py-[50px]">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    {/* Column 1: Customer Service */}
                    <div className="w-full md:w-1/4 mb-8 md:mb-0">
                        <h4 className="text-xl font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-4">
                            <li>
                                <a 
                                    href="#" 
                                    className="hover:underline" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleSidebar();
                                    }}
                                >
                                    Contact Us
                                </a>
                            </li>
                            <li><a href="#" className="hover:underline">Shipping Information</a></li>
                            <li><a href="#" className="hover:underline">Returns & Exchanges</a></li>
                            <li><Link to="/frequently_asked_questions" className="hover:underline">FAQs</Link></li>
                        </ul>
                    </div>
                    {/* Column 2: Company Information */}
                    <div className="w-full md:w-1/4 mb-8 md:mb-0">
                        <h4 className="text-xl font-semibold mb-4">Company</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Careers</a></li>
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline">Terms of Service</a></li>
                        </ul>
                    </div>
                    {/* Column 3: Social Media */}
                    <div className="w-full md:w-1/4 mb-8 md:mb-0">
                        <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-gray-400"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
                            <a href="#" className="hover:text-gray-400"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
                            <a href="#" className="hover:text-gray-400"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
                            <a href="#" className="hover:text-gray-400"><FontAwesomeIcon icon={faYoutube} size="2x" /></a>
                        </div>
                    </div>
                    {/* Column 4: Newsletter Signup */}
                    <div className="w-full md:w-1/4 mb-8 md:mb-0">
                        <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
                        <p className="mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
                        <form>
                            <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 mb-4 text-black" />
                            <button className="w-full px-4 py-2 bg-slate-300 text-black font-bold rounded-lg hover:bg-gray-300 transition duration-300">Subscribe</button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
                    &copy; 2024 OKXEEL. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
