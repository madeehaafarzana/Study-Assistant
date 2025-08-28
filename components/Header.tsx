import React from 'react';

const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);


export function Header(): React.ReactNode {
  return (
    <header className="bg-slate-900/70 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
             <div className="p-2 bg-indigo-500/20 rounded-full border border-indigo-500/30">
               <BookIcon />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              PUC CS Study Buddy
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}