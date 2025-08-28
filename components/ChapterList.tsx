import React from 'react';

interface ChapterListProps {
  chapters: string[];
  selectedChapter: string | null;
  onSelect: (chapter: string) => void;
  isLoading: boolean;
}

export function ChapterList({ chapters, selectedChapter, onSelect, isLoading }: ChapterListProps): React.ReactNode {
  return (
    <div className="bg-slate-800/50 backdrop-blur-lg p-4 rounded-xl shadow-lg border border-white/10">
      <h2 className="text-lg font-semibold mb-3 border-b pb-2 text-slate-200 border-white/10">Chapters</h2>
      <nav className="max-h-[calc(100vh-22rem)] overflow-y-auto pr-2">
        <ul>
          {chapters.map((chapter) => (
            <li key={chapter}>
              <button
                onClick={() => onSelect(chapter)}
                disabled={isLoading}
                className={`w-full text-left p-3 my-1 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out 
                  transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  ${isLoading ? 'cursor-not-allowed text-slate-500' : ''}
                  ${selectedChapter === chapter
                    ? 'bg-indigo-600 text-white font-semibold shadow-lg scale-105'
                    : 'text-slate-300 bg-slate-700/50 hover:bg-indigo-500/20 hover:text-white'
                  }`}
              >
                {chapter}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}