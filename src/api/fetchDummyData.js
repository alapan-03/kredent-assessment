export const fetchDummyData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a random API failure (20% chance) 
      if (Math.random() < 0.2) {
        reject(new Error("Failed to fetch stock data. Please try again."));
      } else {
        fetch('/dummyData.json')
          .then(response => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then(data => {
            // Dynamically update timestamps to be recent
            const now = new Date();
            const updatedData = data.map((stock, index) => ({
              ...stock,
              lastUpdatedTimestamp: new Date(now.getTime() - index * 35 * 1000).toISOString(), // 35-second intervals
            }));
            resolve(updatedData);
          })
          .catch(error => reject(error));
      }
    }, 1500);
  });
};