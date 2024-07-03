import React, { createContext, useState, useContext, useMemo } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity, sizeOrcustomSizes) => {
    console.log('Adding to cart in context...');
    console.log('Product:', product);
    console.log('Quantity:', quantity);
    
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.product._id === product._id);
      
      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          item.product._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
        );
        console.log('Updated cart items:', updatedItems);
        return updatedItems;  
      } else {
        const newItems = [...prevItems, { product, quantity, sizeOrcustomSizes }];
        console.log('New cart items:', newItems);
        return newItems;
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.product._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cartItems])

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}
