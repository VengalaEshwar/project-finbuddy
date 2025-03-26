import React, { useState, useEffect } from "react";
import denominations from "./denominations.json"; // Importing the denominations JSON

const CurrencySimulator = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [breakdown, setBreakdown] = useState([]);

  useEffect(() => {
    fetch("https://v6.exchangerate-api.com/v6/201cc8bba77f9d46b042d2e2/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(Object.keys(data.conversion_rates));
      });
  }, []);

  useEffect(() => {
    if (amount > 0) {
      fetch(`https://v6.exchangerate-api.com/v6/201cc8bba77f9d46b042d2e2/latest/${fromCurrency}`)
        .then((res) => res.json())
        .then((data) => {
          const rate = data.conversion_rates[toCurrency];
          const newAmount = (amount * rate).toFixed(2);
          setConvertedAmount(newAmount);
          convertToDenominations(newAmount, toCurrency);
        });
    }
  }, [amount, fromCurrency, toCurrency]);

  const convertToDenominations = (amount, currency) => {
    const notes = denominations[currency]?.denominations || [];
    let remaining = Math.round(amount * 100); // Convert to cents to avoid floating point errors
    let breakdownArray = [];

    notes.forEach((note) => {
        let noteInCents = Math.round(note * 100); // Convert note value to cents

        if (remaining >= noteInCents) {
            let count = Math.floor(remaining / noteInCents);
            remaining -= count * noteInCents;
            breakdownArray.push({ note, count });
        }
    });

    setBreakdown(breakdownArray);
};



  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 m-auto">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-[0px_15px_20px_rgba(175,100,247,0.5)] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl w-full text-center">

        <h2 className="text-2xl font-bold text-purple-700 mb-4">Currency Converter</h2>
        
        <div className="mb-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-200"
            placeholder="Enter amount"
          />
        </div>
        
        <div className="flex justify-between items-center gap-2 mb-4">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {denominations[cur]?.country || "Unknown"} ({cur})
              </option>
            ))}
          </select>
          <span className="text-xl font-bold">→</span>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {denominations[cur]?.country || "Unknown"} ({cur})
              </option>
            ))}
          </select>
        </div>
  
        <p className="text-lg font-semibold text-purple-800">
          Converted: {convertedAmount} {toCurrency}
        </p>
  
        <h3 className="text-lg font-bold text-purple-600 mt-4">Denomination Breakdown:</h3>
        <ul className="text-gray-700 text-md mt-2">
          {breakdown.map((item, index) => (
            <li key={index} className="border-b py-2">
              {item.count} x {item.note} {toCurrency}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
};

export default CurrencySimulator;
