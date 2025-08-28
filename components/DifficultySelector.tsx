import React from 'react';
import type { Difficulty } from '../types';

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
  isLoading: boolean;
}

export function DifficultySelector({ selectedDifficulty, onSelect, isLoading }: DifficultySelectorProps): React.ReactNode {
  const buttonStyle = (level: Difficulty) =>
    `w-1/2 p-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
     ${isLoading ? 'cursor-not-allowed text-slate-500' : ''}
     ${selectedDifficulty === level
       ? 'bg-indigo-600 text-white shadow-md'
       : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/70'
     }`;

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg p-4 rounded-xl shadow-lg border border-white/10">
      <h3 className="text-lg font-semibold mb-3 text-slate-200">Difficulty Level</h3>
      <div className="flex bg-slate-900/70 p-1 rounded-lg">
        <button
          onClick={() => onSelect('simple')}
          disabled={isLoading}
          className={buttonStyle('simple')}
          aria-pressed={selectedDifficulty === 'simple'}
        >
          Simple Steps
        </button>
        <button
          onClick={() => onSelect('detailed')}
          disabled={isLoading}
          className={buttonStyle('detailed')}
          aria-pressed={selectedDifficulty === 'detailed'}
        >
          Detailed Concepts
        </button>
      </div>
    </div>
  );
}