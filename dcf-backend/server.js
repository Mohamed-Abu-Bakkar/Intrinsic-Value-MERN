const express = require('express');
const yahooFinance = require('yahoo-finance2').default;
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Endpoint to fetch current share price
app.get('/api/price/:ticker', async (req, res) => {
  const ticker = req.params.ticker.toUpperCase() + '.NS'; // For NSE stocks
  try {
    const quote = await yahooFinance.quote(ticker);
    res.json({ price: quote.regularMarketPrice });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch share price.' });
  }
});

// Endpoint to perform DCF calculation
app.post('/api/calculate-dcf', (req, res) => {
  const {
    fcf,
    growthRate,
    discountRate,
    terminalGrowthRate,
    cash,
    debt,
    shares
  } = req.body;

  let projectedFCFs = [];
  let discountedFCFs = [];
  let currentFCF = fcf;
  for (let i = 1; i <= 5; i++) {
    currentFCF *= (1 + growthRate);
    projectedFCFs.push(currentFCF);
    discountedFCFs.push(currentFCF / Math.pow(1 + discountRate, i));
  }

  const terminalFCF = projectedFCFs[4] * (1 + terminalGrowthRate);
  const terminalValue = terminalFCF / (discountRate - terminalGrowthRate);
  const discountedTerminalValue = terminalValue / Math.pow(1 + discountRate, 5);

  const totalDCF = discountedFCFs.reduce((a, b) => a + b, 0) + discountedTerminalValue;
  const equityValue = totalDCF + cash - debt;
  const intrinsicValuePerShare = equityValue / shares;

  res.json({
    projectedFCFs,
    discountedFCFs,
    terminalFCF,
    terminalValue,
    discountedTerminalValue,
    totalDCF,
    equityValue,
    intrinsicValuePerShare
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
