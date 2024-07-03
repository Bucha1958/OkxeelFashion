// ExchangeRateContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const ExchangeRateContext = createContext();

export const ExchangeRateProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

    const convertPrice = (priceInUSD) => {
        if (!exchangeRates[currency]) return priceInUSD; // Fallback if no exchange rate found

        const convertedPrice = priceInUSD * exchangeRates[currency];
        return convertedPrice; // Return the numeric value
    };
  
    const formatPrice = (priceInUSD) => {
        if (!exchangeRates[currency]) return priceInUSD.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }); // Fallback if no exchange rate found
    
        let convertedPrice = priceInUSD * exchangeRates[currency];
    
        if (currency === 'NGN') {
        // Custom formatting for NGN without decimals
        return `₦${convertedPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
        } else {
        // Default formatting for other currencies without decimals
        return convertedPrice.toLocaleString(undefined, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    }
    };

  return (
    <ExchangeRateContext.Provider value={{ currency, setCurrency, exchangeRates, formatPrice, convertPrice }}>
      {children}
    </ExchangeRateContext.Provider>
  );
};

export const useExchangeRate = () => useContext(ExchangeRateContext);
