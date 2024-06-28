import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import Head from '../components/Head';
import '../Hero.css';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems } = useCart();
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        companyName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        // Fetch the list of countries from the API
        fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            // Sort countries alphabetically
            const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
            setCountries(sortedCountries);
        })
        .catch(error => console.error('Error fetching countries:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;d
        setShippingInfo({
            ...shippingInfo,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Proceed to payment
        navigate('/payment', { state: { shippingInfo, cartItems } });
    };

    return (
        <>
            <Head />
            <div className="container mx-auto px-2 py-8 mt-20 montserrat flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">Checkout</h1>
                <form onSubmit={handleSubmit} className='border-gray-300 w-[75%] border-2 p-20 mt-10'>
                    <div className="mb-4 flex justify-between">
                        <label className="mb-2 mr-6">Full Name<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="fullName"
                            value={shippingInfo.fullName}
                            onChange={handleInputChange}
                            className="w-[85%] p-2 rounded border-zinc-300/50 border-b-2 focus: outline-none focus: ring-0 text-black placeholder-gray-600"
                            required
                        />
                    </div>
                    <div className="mb-4 flex justify-between">
                        <label className="mb-2 mr-6">Company(Optional)</label>
                        <input
                            type="text"
                            name="companyName"
                            value={shippingInfo.companyName}
                            onChange={handleInputChange}
                            className="w-[85%] p-2 rounded border-zinc-300/50 border-b-2 focus: outline-none focus: ring-0 text-black placeholder-gray-600"
                        />
                    </div>
                    <div className="mb-4 flex justify-between">
                        <label className="mr-6 mb-2">Address<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="address"
                            value={shippingInfo.address}
                            onChange={handleInputChange}
                            className="w-[85%] p-2 rounded border-zinc-300/50 border-b-2 focus: outline-none focus: ring-0 text-black placeholder-gray-600"
                            required
                        />
                    </div>
                    <div className="mb-4 flex justify-between">
                        <label className="mr-6 mb-2">City<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="city"
                            value={shippingInfo.city}
                            onChange={handleInputChange}
                            className="w-[85%] p-2 rounded border-zinc-300/50 border-b-2 focus: outline-none focus: ring-0 text-black placeholder-gray-600"
                            required
                        />
                    </div>
                    <div className="mb-4 flex justify-between">
                        <label className="mr-6 mb-2">State<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="state"
                            value={shippingInfo.state}
                            onChange={handleInputChange}
                            className="w-[85%] p-2 rounded border-zinc-300/50 border-b-2 focus: outline-none focus: ring-0 text-black placeholder-gray-600"
                            required
                        />
                    </div>
                    <div className="mb-4 flex justify-between">
                        <label className="mr-6 mb-2">ZIP Code</label>
                        <input
                            type="text"
                            name="zipCode"
                            value={shippingInfo.zipCode}
                            onChange={handleInputChange}
                            className="w-[85%] p-2 rounded border-zinc-300/50 border-b-2 focus: outline-none focus: ring-0 text-black placeholder-gray-600"
                            
                        />
                    </div>
                    <div className="mb-4 flex justify-between">
                        <label className="mr-6 mb-2">Country<span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="country"
                            value={shippingInfo.country}
                            onChange={handleInputChange}
                            className="w-[85%] p-2 rounded border-zinc-300/50 border-b-2 focus: outline-none focus: ring-0 text-black placeholder-gray-600"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-10">Proceed to Payment</button>
                </form>
            </div>
        </>
        
    );
};

export default CheckoutPage;
