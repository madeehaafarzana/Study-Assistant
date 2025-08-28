import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage } from '../types';

interface ChatBoxProps {
    chatHistory: ChatMessage[];
    isLoading: boolean;
    onSendMessage: (message: string) => void;
}

export function ChatBox({ chatHistory, isLoading, onSendMessage }: ChatBoxProps): React.ReactNode {
    const [input, setInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory, isLoading]);

    const handleSend = () => {
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
        }
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    return (
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-white/10 p-4 mt-8 flex flex-col max-h-[70vh]">
            <h3 className="text-lg font-semibold mb-3 border-b pb-2 text-slate-200 border-white/10">Ask a Doubt</h3>
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xl px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
                           <p className="text-sm whitespace-pre-wrap">{msg.parts}</p>
                        </div>
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-xl px-4 py-2 rounded-lg bg-slate-700 text-slate-200">
                           <div className="flex items-center space-x-2">
                               <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                               <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                               <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                           </div>
                        </div>
                    </div>
                 )}
                <div ref={chatEndRef} />
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a question about this chapter..."
                    disabled={isLoading}
                    className="flex-1 p-2 bg-slate-700/80 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-200 placeholder-slate-400 resize-none"
                    rows={1}
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}