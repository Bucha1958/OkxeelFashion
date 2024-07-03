import React from 'react';
import { useExchangeRate } from '../ExchangeRateContext';

const CurrencySelector = () => {
  const { currency, setCurrency } = useExchangeRate();

  const handleChangeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <div className="flex items-center mt-6">
      <label htmlFor="currency" className="mr-2">Currency:</label>
      <select
        id="currency"
        value={currency}
        onChange={(e) => handleChangeCurrency(e.target.value)}
        className="border border-gray-300 rounded p-1 focus:outline-none"
      >
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
        <option value="EUR">EUR</option>
        <option value="NGN">NGN</option>
      </select>
    </div>
  );
};

export default CurrencySelector;
