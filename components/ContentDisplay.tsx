import React from 'react';
import type { QuestionAnswer, ChatMessage } from '../types';
import { QuestionAccordion } from './QuestionAccordion';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { ChatBox } from './ChatBox';

interface ContentDisplayProps {
  isLoading: boolean;
  error: string | null;
  content: QuestionAnswer[];
  selectedChapter: string | null;
  chatHistory: ChatMessage[];
  isChatLoading: boolean;
  onSendMessage: (message: string) => void;
}

const WelcomeMessage = () => (
    <div className="text-center p-10 bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-white/10 flex flex-col items-center justify-center h-full animate-fade-in">
        <div className="p-4 bg-indigo-500/20 rounded-full mb-6 border border-indigo-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Ready to Learn?</h2>
        <p className="text-slate-400 max-w-md">Your personal Computer Science study buddy is here. Just pick a chapter from the list on the left to begin your journey!</p>
    </div>
);


export function ContentDisplay({ isLoading, error, content, selectedChapter, chatHistory, isChatLoading, onSendMessage }: ContentDisplayProps): React.ReactNode {
  if (isLoading && content.length === 0) {
    return <div className="flex justify-center items-center h-96"><LoadingSpinner /></div>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }
  
  if (!selectedChapter) {
      return <WelcomeMessage />;
  }
  
  return (
    <div className="space-y-8 animate-fade-in" key={selectedChapter}>
        <div>
            <h2 className="text-3xl font-bold text-slate-100 mb-6 pb-2 border-b-2 border-indigo-500/30">{selectedChapter}</h2>
            <div className="space-y-4">
            {content.map((item, index) => (
                <QuestionAccordion key={index} question={item.question} answerSteps={item.answerSteps} />
            ))}
             {isLoading && content.length > 0 && <div className="pt-4"><LoadingSpinner/></div>}
            </div>
        </div>
        
        {content.length > 0 && (
            <ChatBox 
                chatHistory={chatHistory} 
                isLoading={isChatLoading} 
                onSendMessage={onSendMessage} 
            />
        )}
    </div>
  );
}