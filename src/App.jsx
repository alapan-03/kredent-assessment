// src/App.jsx
import React from 'react';
import Watchlist from './pages/Watchlist';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Stock Watchlist Lite</h1>
      <Watchlist />
    </div>
  );
}

export default App;