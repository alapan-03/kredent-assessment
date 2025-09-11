import React from 'react';
import './SortMenu.css';

const SortMenu = ({ sortConfig, setSortConfig }) => {
  const handleSortChange = (e) => {
    setSortConfig({ ...sortConfig, key: e.target.value });
  };

  const toggleDirection = () => {
    setSortConfig({
      ...sortConfig,
      direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  return (
    <div className="sort-menu-container">
      <label htmlFor="sort-select">Sort by:</label>
      <select id="sort-select" value={sortConfig.key} onChange={handleSortChange}>
        <option value="percentageChange">Percentage Change</option>
        <option value="capitalMarketLastTradedPrice">CM LTP</option>
        <option value="futuresLastTradedPrice">FUT LTP</option>
      </select>
      <button onClick={toggleDirection} className="sort-direction-btn">
        {sortConfig.direction === 'ascending' ? '↑ Asc' : '↓ Desc'}
      </button>
    </div>
  );
};

export default SortMenu;