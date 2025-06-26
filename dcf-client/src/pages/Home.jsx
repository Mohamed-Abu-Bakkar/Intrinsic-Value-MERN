const handleCalculate = async (data) => {
  try {
    const response = await fetch('/api/calculate-dcf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fcf: parseFloat(data.freeCashFlow),
        growthRate: parseFloat(data.revenueGrowthRate) / 100,
        discountRate: parseFloat(data.discountRate) / 100,
        terminalGrowthRate: parseFloat(data.terminalGrowthRate) / 100,
        cash: parseFloat(data.cash),
        debt: parseFloat(data.debt),
        shares: parseFloat(data.shares),
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const resultData = await response.json();
    setResults(resultData);
  } catch (error) {
    console.error('Error during DCF calculation:', error);
  }
};
