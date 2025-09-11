
import React, { useState } from 'react';
import './StockCard.css';
import useRelativeTime from './../../hooks/useRelativeTime';

const StockCard = ({ stock, onCardClick }) => {
  const [isViewB, setIsViewB] = useState(false);
  const relativeTime = useRelativeTime(stock.lastUpdatedTimestamp);

  const formatPrice = (price) => `₹${price.toFixed(2)}`;

  const percentageColor = stock.percentageChange >= 0 ? 'positive' : 'negative';
  const percentageSign = stock.percentageChange >= 0 ? '+' : '';

  const diff = isViewB 
    ? stock.capitalMarketLastTradedPrice - stock.futuresLastTradedPrice
    : stock.futuresLastTradedPrice - stock.capitalMarketLastTradedPrice;

  const toggleView = (e) => {
    e.stopPropagation();
    setIsViewB(!isViewB);
  };

  return (
    <div className="stock-card" onClick={() => onCardClick(stock)}>
      <h3 className="card-symbol">{stock.tradingSymbol}</h3>
      <div className="price-section">
        <p>CM LTP: <span className="price-value">{formatPrice(stock.capitalMarketLastTradedPrice)}</span></p>
        <p>FUT LTP: <span className="price-value">{formatPrice(stock.futuresLastTradedPrice)}</span></p>
      </div>
      <p className={`percentage-change ${percentageColor}`}>
        {percentageSign}{stock.percentageChange.toFixed(2)}%
      </p>
      <div className="card-footer">
        <p className="last-updated">{relativeTime}</p>
        <button onClick={toggleView} className="toggle-button">
          {isViewB ? 'CM - FUT' : 'FUT - CM'}: 
          <span className={diff >= 0 ? 'positive' : 'negative'}>
            {` ${diff.toFixed(2)}`}
          </span>
        </button>
      </div>
    </div>
  );
};

export default StockCard;