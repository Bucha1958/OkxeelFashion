
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import Head from '../components/Head';
import '../Hero.css';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, totalPrice } = useCart();
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
        const { name, value } = e.target;
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
            <div className="container mx-auto px-4 py-8 mt-20 font-montserrat flex flex-col justify-center items-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Checkout</h1>
                <form onSubmit={handleSubmit} className="w-full md:w-3/4 lg:w-1/2 border border-gray-300 p-4 md:p-8 mt-4">
                    {[
                        { label: 'Full Name', name: 'fullName', required: true },
                        { label: 'Company (Optional)', name: 'companyName' },
                        { label: 'Address', name: 'address', required: true },
                        { label: 'City', name: 'city', required: true },
                        { label: 'State', name: 'state', required: true },
                        { label: 'ZIP Code', name: 'zipCode' },
                    ].map(({ label, name, required }) => (
                        <div key={name} className="mb-4">
                            <label className="block mb-2">{label}{required && <span className="text-red-500">*</span>}</label>
                            <input
                                type="text"
                                name={name}
                                value={shippingInfo[name]}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required={required}
                            />
                        </div>
                    ))}
                    <div className="mb-4">
                        <label className="block mb-2">Country<span className="text-red-500">*</span></label>
                        <select
                            name="country"
                            value={shippingInfo.country}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option key={country.cca3} value={country.name.common}>
                                    {country.name.common}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-4">
                        Proceed to Payment
                    </button>
                </form>
            </div>
            <div className="container mx-auto px-4 py-8 font-montserrat flex flex-col justify-center items-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Your Order</h1>
                <div className="w-full md:w-3/4 lg:w-1/2 border border-gray-300 p-4 md:p-8 mt-4">
                    {cartItems.map(({ product, quantity }) => (
                        <div key={product._id} className="flex flex-col md:flex-row justify-between items-center mb-4">
                            <div className="flex items-center w-full md:w-1/2">
                                <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover mr-4" />
                                <div className="flex flex-col">
                                    <p>{product.name}</p>
                                    <p>Quantity: {quantity}</p>
                                    <p>Price: ${product.price}</p>
                                </div>
                            </div>
                            <p className="mt-2 md:mt-0 text-lg md:text-base lg:text-lg font-semibold">Total: ${product.price * quantity}</p>
                        </div>
                    ))}
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-xl font-bold">Total Price: ${totalPrice}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckoutPage;
