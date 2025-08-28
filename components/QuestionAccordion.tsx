import React, { useState } from 'react';

interface QuestionAccordionProps {
  question: string;
  answerSteps: string[];
}

const ChevronIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

// A simple heuristic to detect if a string is a code snippet
const isCodeSnippet = (text: string): boolean => {
  const codeKeywords = ['def ', 'for ', 'while ', 'if ', 'else:', 'elif ', 'import ', 'class ', 'print('];
  const lines = text.split('\n');
  // If it has multiple lines, starts/ends with ```, or contains common keywords, treat it as code.
  if (lines.length > 1 || text.trim().startsWith('```')) return true;
  return codeKeywords.some(keyword => text.trim().startsWith(keyword));
};


export function QuestionAccordion({ question, answerSteps }: QuestionAccordionProps): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-xl"
        aria-expanded={isOpen}
      >
        <h3 className="text-md font-semibold text-slate-100 flex-1 pr-4">{question}</h3>
        <span className={`text-indigo-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
           <ChevronIcon />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}
      >
        <div className="px-5 pb-6">
            <div className="border-t border-white/10 pt-4">
                <h4 className="font-semibold text-slate-300 mb-3">Answer:</h4>
                <ol className="space-y-3 pl-5">
                    {answerSteps.map((step, index) => (
                       isCodeSnippet(step) ? (
                        <li key={index} className="list-none -ml-5 my-3">
                          <pre className="bg-slate-900/80 text-white p-4 rounded-md text-sm overflow-x-auto font-mono border border-white/10">
                            <code>{step.replace(/```python\n|```/g, '')}</code>
                          </pre>
                        </li>
                      ) : (
                        <li key={index} className="text-slate-300 leading-relaxed list-decimal marker:text-indigo-400 marker:font-bold">
                            {step}
                        </li>
                      )
                    ))}
                </ol>
            </div>
        </div>
      </div>
    </div>
  );
}