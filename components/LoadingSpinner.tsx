import React, { useState, useEffect } from 'react';

const messages = [
  "Fetching insights...",
  "Compiling key concepts...",
  "Simplifying complex topics...",
  "Generating step-by-step answers...",
  "Brewing some digital coffee...",
  "Warming up the AI brain...",
  "Don't blink or you'll miss it!",
];

export function LoadingSpinner(): React.ReactNode {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = messages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-800/50 backdrop-blur-lg rounded-xl">
        <div className="w-12 h-12 border-4 border-t-4 border-slate-600 border-t-indigo-500 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium text-center w-48">{message}</p>
    </div>
  );
}