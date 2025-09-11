Stock Watchlist Lite
This is a simple React web app built for a frontend assignment. It displays a list of stocks, lets you filter and sort them, and view details in a side panel.

How to Run This Project
First, make sure you have Node.js on your computer.

Clone the repo:

git clone 

Go into the project folder:

cd stock-watchlist-lite

Install the packages:

npm install

Run the app:

npm run dev

It should now be running on http://localhost:5173 or a similar address.

To run the tests:

npm test

Questions I Would've Asked
Before starting, I would've asked a few things to get a clearer picture. Here are some of them and the assumptions I made.

Question: For the toggle button on the card, should the labels be "View A" and "View B" as written in the doc, or would it be better to show the actual calculation like "FUT - CM" to be clearer for the user?

My Assumption: I assumed showing the actual calculation (FUT - CM and CM - FUT) is more user-friendly, so I went with that.

Question: The chart in the details drawer uses dummy data. Does this data need to be the same every time I open the drawer for the same stock, or is it okay if it's random each time?

My Assumption: For this assignment, I assumed randomly generating the chart data on each open was good enough.

Question: What's the default way the stocks should be sorted when the page first loads?

My Assumption: I set the default sort to "Percentage Change" (descending), since that's a pretty common way to look at a watchlist.

Question: The app uses dummy data from a JSON file. Should I build it in a way that it could easily switch to a live API or a WebSocket later on?

My Assumption: I separated the data-fetching logic into its own file (src/api/fetchDummyData.js). This way, you'd only need to change that one file to connect to a real backend without touching the UI components.

Features Implemented
1. Shows stock cards in a responsive grid (6 per row on desktop).

2. Each card displays the symbol, prices, and percentage change.

3. Percentage change is colored green for positive, red for negative.

4. "Last updated" time text updates automatically (e.g., "30 seconds ago").

5. A toggle button on each card to switch between FUT - CM and CM - FUT price differences.

6. A search bar to filter stocks by their trading symbol.

7. Sorting options for Percentage Change, CM LTP, and FUT LTP (both ascending and descending).

8. Clicking a card opens a side drawer with more details.

9. The drawer shows a dummy 30-point line chart.

10. Loading skeletons are shown while data is being fetched.

11. An error message with a "Try Again" button appears if the data fails to load.

12. A "Refresh" button to manually reload the data.

13. Unit tests for rendering cards, the view toggle, and the error/retry flow.

Known Tradeoffs & Next Steps
I made a few choices to get this done within the time limit. Here are some of them and what I'd do next.

Tradeoff: All logic is on the client. The filtering and sorting happens in the browser. This is fine for a small number of stocks but would get slow with a lot of data.

Next Step: In a real app, I'd make the API handle the filtering and sorting to keep the frontend fast.

Tradeoff: Simple State Management. I just used React's built-in useState and useMemo hooks to manage state. This works well for a small app.

Next Step: If the app got bigger (like adding user accounts or multiple watchlists), I would use a state management library like Zustand or Redux Toolkit to keep things organized.
