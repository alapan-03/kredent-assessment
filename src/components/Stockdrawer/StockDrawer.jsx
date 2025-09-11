// src/components/StockDrawer.jsx
import React from 'react';
import './StockDrawer.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Generate dummy data for the chart
const generateChartData = (basePrice) => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
    const price = basePrice + (randomFactor * basePrice * 0.02); // Fluctuate by +/- 2%
    data.push({
      name: `${i}d ago`,
      price: parseFloat(price.toFixed(2)),
    });
  }
  return data;
};


const StockDrawer = ({ stock, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Handle case where stock data might be missing
  if (!stock) {
    return (
      <div className="drawer-overlay" onClick={onClose}>
        <div className="drawer-container" onClick={e => e.stopPropagation()}>
          <div className="drawer-header">
            <h3>Error</h3>
            <button onClick={onClose} className="close-btn">&times;</button>
          </div>
          <div className="drawer-content">
            <p>Could not load stock details. Please try again.</p>
          </div>
        </div>
      </div>
    );
  }

  const chartData = generateChartData(stock.capitalMarketLastTradedPrice);

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-container" onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <h3>{stock.tradingSymbol}</h3>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        <div className="drawer-content">
          <h4>30-Day Price Chart (Dummy Data)</h4>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" stroke="var(--secondary-text)" />
                <YAxis stroke="var(--secondary-text)" domain={['dataMin - 5', 'dataMax + 5']}/>
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface-dark)', border: '1px solid var(--border-color)' }}/>
                <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <h4>Details</h4>
          <ul className="details-list">
            <li><span>CM LTP:</span> <strong>₹{stock.capitalMarketLastTradedPrice.toFixed(2)}</strong></li>
            <li><span>FUT LTP:</span> <strong>₹{stock.futuresLastTradedPrice.toFixed(2)}</strong></li>
            <li><span>% Change:</span> <strong className={stock.percentageChange >= 0 ? 'positive' : 'negative'}>{stock.percentageChange.toFixed(2)}%</strong></li>
            <li><span>Last Updated:</span> {new Date(stock.lastUpdatedTimestamp).toLocaleString()}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StockDrawer;