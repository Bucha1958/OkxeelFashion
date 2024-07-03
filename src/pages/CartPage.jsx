
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Head from '../components/Head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../CartContext';
import { useExchangeRate } from '../ExchangeRateContext';

const CartPage = () => {
    const { cartItems, removeFromCart, totalPrice } = useCart();
    const navigate = useNavigate();
    const { convertPrice, currency } = useExchangeRate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const convertedTotalPrice = cartItems.reduce((acc, { product, quantity }) => {
        return acc + convertPrice(product.price) * quantity;
    }, 0);

    const formattedTotalPrice = convertedTotalPrice.toLocaleString(undefined, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return (
        <>
            <Head />
            <div className="container mx-auto px-2 py-8 mt-8 font-poppins">
                {cartItems.length === 0 ? (
                    <p className="text-center text-xl mt-6">Your cart is empty</p>
                ) : (
                    <div>
                        {cartItems.map(({ product, quantity, sizeOrcustomSizes }) => {
                            const total = convertPrice(product.price) * quantity;
                            const formattedTotal = total.toLocaleString(undefined, {
                                style: 'currency',
                                currency: currency,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            });

                            return (
                                <div key={product._id} className="flex flex-col md:flex-row justify-between items-center mb-4 p-4 border rounded-md">
                                    <div className="flex items-center w-full md:w-1/2">
                                        <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover mr-4" />
                                        <div className="flex flex-col w-full">
                                            <p className="text-lg">{product.name}</p>
                                            <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                                            <p className="text-sm text-gray-600">
                                                Price: {convertPrice(product.price).toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: currency,
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0,
                                                })}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Size: {typeof sizeOrcustomSizes === 'string' ? sizeOrcustomSizes : 'Custom sizes provided'}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-lg md:text-base lg:text-lg font-semibold mt-2 md:mt-0 md:ml-4">Total: {formattedTotal}</p>
                                    <button onClick={() => removeFromCart(product._id)} className="ml-4 text-red-600">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            );
                        })}
                        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                            <p className="text-xl font-bold mb-4 md:mb-0">Total Price: {formattedTotalPrice}</p>
                            <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto">
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartPage;

