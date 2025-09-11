import React from 'react';
import { render, screen } from '@testing-library/react';
import StockCard from './../components/Stockcard/StockCard';

// Mock the custom hook to return a static value
jest.mock('./../hooks/useRelativeTime', () => ({
  __esModule: true,
  default: () => '5 min ago',
}));

describe('StockCard Component', () => {
  const mockStock = {
    id: 1,
    tradingSymbol: 'RELIANCE',
    capitalMarketLastTradedPrice: 2915.45,
    futuresLastTradedPrice: 2921.10,
    percentageChange: 0.84,
    lastUpdatedTimestamp: new Date().toISOString(),
  };

  test('renders all required fields with correct data', () => {
    // Render the component with mock data
    render(<StockCard stock={mockStock} onCardClick={() => {}} />);

    // Assert that the trading symbol is displayed
    expect(screen.getByText('RELIANCE')).toBeInTheDocument();

    // Assert that the Capital Market LTP is displayed and correctly formatted
    expect(screen.getByText(/CM LTP:/i)).toHaveTextContent('₹2915.45');
    
    // Assert that the Futures LTP is displayed and correctly formatted
    expect(screen.getByText(/FUT LTP:/i)).toHaveTextContent('₹2921.10');

    // Assert that the percentage change is displayed with a '+' sign for positive values
    expect(screen.getByText('+0.84%')).toBeInTheDocument();
    expect(screen.getByText('+0.84%')).toHaveClass('positive');

    // Assert that the mocked relative time is displayed
    expect(screen.getByText('5 min ago')).toBeInTheDocument();
  });
});
