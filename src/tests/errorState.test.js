import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Watchlist from '../pages/Watchlist';
import { fetchDummyData } from '../api/fetchDummyData';

// Mock the entire fetchDummyData module
jest.mock('./../api/fetchDummyData');

describe('Watchlist Page Error Handling', () => {
  test('displays an error state on fetch failure and retries successfully', async () => {
    const errorMessage = 'Failed to fetch stock data.';
    
    // setup the mock to fail on the first call
    fetchDummyData.mockRejectedValueOnce(new Error(errorMessage));

    render(<Watchlist />);

    // verify that the error message is displayed
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    
    // verify the "try Again" button is present
    const retryButton = screen.getByRole('button', { name: /try again/i });
    expect(retryButton).toBeInTheDocument();

    //Setup the mock to succeed on the retry
    const mockSuccessData = [{
      id: 1,
      tradingSymbol: 'SUCCESS',
      capitalMarketLastTradedPrice: 100,
      futuresLastTradedPrice: 101,
      percentageChange: 1.0,
      lastUpdatedTimestamp: new Date().toISOString(),
    }];
    fetchDummyData.mockResolvedValueOnce(mockSuccessData);

    // Simulate a click on the retry button
    fireEvent.click(retryButton);
    
    
    expect(await screen.findByText('SUCCESS')).toBeInTheDocument();

    // Ensure the error message is gone
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
    
    // Ensure the API was called twice
    expect(fetchDummyData).toHaveBeenCalledTimes(2);
  });
});
