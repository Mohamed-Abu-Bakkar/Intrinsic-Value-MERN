import React, { useState, useEffect } from 'react';

const InputForm = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    ticker: '',
    revenueGrowthRate: '',
    freeCashFlow: '',
    discountRate: '',
    terminalGrowthRate: '',
    cash: '',
    debt: '',
    shares: '',
    projectionYears: 5,
  });

  const [currentPrice, setCurrentPrice] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (formData.ticker) {
      fetchPrice(formData.ticker);
    }
  }, [formData.ticker]);

  const fetchPrice = async (ticker) => {
    try {
      const response = await fetch(`https://intrinsic-value-mern.onrender.com/api/price/${ticker}`);
      const data = await response.json();
      if (data.price) {
        setCurrentPrice(data.price);
        setError('');
      } else {
        throw new Error();
      }
    } catch (error) {
      setCurrentPrice(null);
      setError('Failed to fetch share price. Please check the ticker.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate({ ...formData, currentPrice });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1f2937] text-white shadow-xl rounded-xl p-8 w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-cyan-400">Intrinsic Value Calculator</h2>

      {[
        { label: 'Stock Ticker', name: 'ticker', type: 'text' },
        { label: 'Revenue Growth Rate (%)', name: 'revenueGrowthRate', type: 'number' },
        { label: 'Free Cash Flow (FCF)', name: 'freeCashFlow', type: 'number' },
        { label: 'Discount Rate (%)', name: 'discountRate', type: 'number' },
        { label: 'Terminal Growth Rate (%)', name: 'terminalGrowthRate', type: 'number' },
        { label: 'Cash', name: 'cash', type: 'number' },
        { label: 'Debt', name: 'debt', type: 'number' },
        { label: 'Shares Outstanding', name: 'shares', type: 'number' },
      ].map((field) => (
        <div className="mb-4" key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>
      ))}

      <div className="mb-6">
        <label
          htmlFor="projectionYears"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Years of Projection: {formData.projectionYears}
        </label>
        <input
          type="range"
          id="projectionYears"
          name="projectionYears"
          min="1"
          max="10"
          value={formData.projectionYears}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      {currentPrice && (
        <p className="text-green-400 text-sm mb-4">
          Current Share Price: ₹{currentPrice}
        </p>
      )}

      {error && (
        <p className="text-red-500 text-sm mb-4">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition"
      >
        Calculate
      </button>
    </form>
  );
};

export default InputForm;
