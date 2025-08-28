import React from 'react';
import type { Standard } from '../types';

interface StandardSelectorProps {
  standards: readonly Standard[];
  selectedStandard: Standard;
  onSelect: (standard: Standard) => void;
  isLoading: boolean;
}

export function StandardSelector({ standards, selectedStandard, onSelect, isLoading }: StandardSelectorProps): React.ReactNode {
    const buttonStyle = (level: Standard) =>
    `w-1/2 p-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
     ${isLoading ? 'cursor-not-allowed text-slate-500' : ''}
     ${selectedStandard === level
       ? 'bg-indigo-600 text-white shadow-md'
       : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/70'
     }`;

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg p-4 rounded-xl shadow-lg border border-white/10">
      <h3 className="text-lg font-semibold mb-3 text-slate-200">Standard</h3>
      <div className="flex bg-slate-900/70 p-1 rounded-lg">
        {standards.map(standard => (
            <button
            key={standard}
            onClick={() => onSelect(standard)}
            disabled={isLoading}
            className={buttonStyle(standard)}
            aria-pressed={selectedStandard === standard}
            >
            {standard}
            </button>
        ))}
      </div>
    </div>
  );
}