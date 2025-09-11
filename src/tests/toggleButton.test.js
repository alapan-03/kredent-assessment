import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StockCard from './../components/Stockcard/StockCard';

// Mock the useRelativeTime hook
jest.mock('./../hooks/useRelativeTime', () => ({
  __esModule: true,
  default: () => 'just now',
}));

describe('StockCard Toggle Functionality', () => {
  const mockStock = {
    id: 2,
    tradingSymbol: 'TCS',
    capitalMarketLastTradedPrice: 3712.20,
    futuresLastTradedPrice: 3715.75,
    percentageChange: -0.45,
    lastUpdatedTimestamp: new Date().toISOString(),
  };

  test('toggle button correctly switches between View A and View B', () => {
    render(<StockCard stock={mockStock} onCardClick={() => {}} />);

    // Find the toggle button
    const toggleButton = screen.getByRole('button', { name: /FUT - CM/i });

    //Initial State
    expect(toggleButton).toHaveTextContent('FUT - CM: 3.55');

    // Simulate a user click on the toggle button
    fireEvent.click(toggleButton);

    //After Click
    expect(screen.getByRole('button')).toHaveTextContent('CM - FUT: -3.55');

    // Click again to ensure it toggles back
    fireEvent.click(toggleButton);
    expect(screen.getByRole('button')).toHaveTextContent('FUT - CM: 3.55');
  });
});
