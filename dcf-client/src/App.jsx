import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';

const App = () => {
  const [result, setResult] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);

  const handleCalculate = async (formData) => {
    const {
      revenueGrowthRate,
      freeCashFlow,
      discountRate,
      terminalGrowthRate,
      cash,
      debt,
      shares,
      currentPrice,
    } = formData;

    const res = await fetch('http://localhost:5000/api/calculate-dcf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fcf: parseFloat(freeCashFlow),
        growthRate: parseFloat(revenueGrowthRate) / 100,
        discountRate: parseFloat(discountRate) / 100,
        terminalGrowthRate: parseFloat(terminalGrowthRate) / 100,
        cash: parseFloat(cash),
        debt: parseFloat(debt),
        shares: parseFloat(shares)
      })
    });

    const data = await res.json();
    setResult(data);
    setCurrentPrice(currentPrice);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <InputForm onCalculate={handleCalculate} />
      <ResultDisplay result={result} currentPrice={currentPrice} />
    </div>
  );
};

export default App;
