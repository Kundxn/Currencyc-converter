import React, { useState } from 'react';

function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleConversion = async () => {
    try {
      const response = await fetch(`http://localhost:8080/convert?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amount}`);
      const data = await response.json();
      setConvertedAmount(data);
    } catch (error) {
      console.error("Error during conversion", error);
    }
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <input
        type="text"
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        placeholder="From currency (e.g., USD)"
      />
      <input
        type="text"
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        placeholder="To currency (e.g., EUR)"
      />
      <button onClick={handleConversion}>Convert</button>

      {convertedAmount !== null && (
        <div>
          <h2>Converted Amount: {convertedAmount}</h2>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
