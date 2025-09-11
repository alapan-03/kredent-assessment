import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchDummyData } from '../api/fetchDummyData';
import StockCard from '../components/Stockcard/StockCard';
import SkeletonCard from '../components/SkeletonCard/SkeletonCard';
import ErrorState from '../components/Errorstate/ErrorState';
import SearchBar from '../components/Searchbar/SearchBar'; 
import SortMenu from '../components/SortMenu/SortMenu';   
import StockDrawer from '../components/Stockdrawer/StockDrawer';
import './Watchlist.css';

const Watchlist = () => {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'percentageChange', direction: 'descending' });
   const [selectedStock, setSelectedStock] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const loadData = useCallback(() => {
    setIsLoading(true);
    setError(null);
    fetchDummyData()
      .then(data => {
        setStocks(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = () => {
    loadData();
  };

   const handleCardClick = (stock) => {
    setSelectedStock(stock);
    setIsDrawerOpen(true);
  };

   const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    // A small delay to allow the closing animation to finish
    setTimeout(() => setSelectedStock(null), 300);
  };

  // logic for filtering and sorting
  const filteredAndSortedStocks = useMemo(() => {
    let sortedStocks = [...stocks];

    // Filtering logic
    if (searchTerm) {
      sortedStocks = sortedStocks.filter(stock =>
        stock.tradingSymbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting logic
    sortedStocks.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    return sortedStocks;
  }, [stocks, searchTerm, sortConfig]);

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />);
    }
    if (error) {
      return (
        <div className="full-width-container">
          <ErrorState message={error} onRetry={handleRefresh} />
        </div>
      );
    }
    if (filteredAndSortedStocks.length === 0) {
      return (
        <div className="full-width-container">
          <p className="no-results-message">No stocks match your criteria.</p>
        </div>
      );
    }
    return filteredAndSortedStocks.map(stock => (
      <StockCard key={stock.id} stock={stock} onCardClick={handleCardClick} />
    ));
  };

  return (
    <div>
      <div className="watchlist-header">
        <h2>My Watchlist</h2>
        <button onClick={handleRefresh} className="refresh-button" disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      <div className="controls-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <SortMenu sortConfig={sortConfig} setSortConfig={setSortConfig} />
      </div>

      <div className="stock-grid">
        {renderContent()}
      </div>
       <StockDrawer 
        stock={selectedStock} 
        isOpen={isDrawerOpen} 
        onClose={handleDrawerClose} 
      />
    </div>
  );
};

export default Watchlist;