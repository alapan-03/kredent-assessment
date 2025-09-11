import React from 'react';
import './ErrorState.css';

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <p className="error-message">{message || "Something went wrong."}</p>
      <button onClick={onRetry} className="retry-button">
        Try Again
      </button>
    </div>
  );
};

export default ErrorState;