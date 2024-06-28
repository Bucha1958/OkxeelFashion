

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Head from '../components/Head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../CartContext';

const CartPage = () => {
    const { cartItems, removeFromCart, totalPrice } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
      <>
        <Head />
        <div className="container mx-auto px-2 py-8 mt-[5%] font-poppins">
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {cartItems.map(({product, quantity}) => (
                        <div key={product._id} className="flex justify-between items-center mb-4">
                            <div className="flex items-end justify-end w-[50%]">
                                <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover mr-4" />
                                <div className=' w-[100%]'>
                                    <p>{product.name}</p>
                                    <p>Quantity: {quantity}</p>
                                    <p>Price: ${product.price}</p>
                                </div>
                                
                            </div>
                            <p>Total: ${product.price * quantity}</p>
                            
                            <div>
                              <button onClick={() => removeFromCart(product._id)} className="ml-4 text-red-600">
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-xl font-bold">Total Price: ${totalPrice}</p>
                    <div>
                      <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded ">
                          Checkout
                      </button>
                    </div>  
                    
                    </div>
                </div>
            )}
        </div>
      </>
        
    );
};

export default CartPage;


