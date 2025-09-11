// src/hooks/useRelativeTime.js
import { useState, useEffect } from 'react';

const intervals = [
  { label: 'year', seconds: 31536000 },
  { label: 'month', seconds: 2592000 },
  { label: 'day', seconds: 86400 },
  { label: 'hour', seconds: 3600 },
  { label: 'minute', seconds: 60 },
  { label: 'second', seconds: 1 }
];

const formatTimeAgo = (date) => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const interval = intervals.find(i => i.seconds <= seconds);

  if (!interval) {
    return 'just now';
  }
  
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
}

const useRelativeTime = (timestamp) => {
  const [relativeTime, setRelativeTime] = useState(() => formatTimeAgo(new Date(timestamp)));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRelativeTime(formatTimeAgo(new Date(timestamp)));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return relativeTime;
};

export default useRelativeTime;