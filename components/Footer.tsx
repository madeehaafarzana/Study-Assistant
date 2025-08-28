import React from 'react';

export function Footer(): React.ReactNode {
  return (
    <footer className="bg-transparent mt-12 py-6">
      <div className="container mx-auto text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} PUC CS Study Buddy. All Rights Reserved.</p>
        <p className="text-sm mt-1">Powered by the Gemini API</p>
      </div>
    </footer>
  );
}