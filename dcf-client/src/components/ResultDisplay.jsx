import React from 'react';

const ResultDisplay = ({ result, currentPrice }) => {
  if (!result) return null;

  const marginOfSafety = ((1 - currentPrice / result.intrinsicValuePerShare) * 100).toFixed(2);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl max-w-3xl mx-auto mt-8">
      <h3 className="text-2xl font-bold text-cyan-400 mb-4">Results</h3>
      <p><strong>Intrinsic Value/Share:</strong> ₹{result.intrinsicValuePerShare.toFixed(2)}</p>
      <p><strong>Current Market Price:</strong> ₹{currentPrice}</p>
      <p><strong>Margin of Safety:</strong> {marginOfSafety}%</p>
    </div>
  );
};

export default ResultDisplay;
