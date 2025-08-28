import React, { useState, useCallback } from 'react';
import { CHAPTERS, STANDARDS } from './constants';
import type { QuestionAnswer, Difficulty, Standard, ChatSession, ChatMessage } from './types';
import { getChapterContent, startChatSession, continueChat } from './services/geminiService';
import { ChapterList } from './components/ChapterList';
import { ContentDisplay } from './components/ContentDisplay';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DifficultySelector } from './components/DifficultySelector';
import { StandardSelector } from './components/StandardSelector';

function App(): React.ReactNode {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [content, setContent] = useState<QuestionAnswer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('simple');
  const [standard, setStandard] = useState<Standard>(STANDARDS[1]); // Default to 2nd PUC

  // Chat state
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);


  const fetchContent = useCallback(async (chapter: string, level: Difficulty, std: Standard) => {
    if (isLoading) return;

    setSelectedChapter(chapter);
    setIsLoading(true);
    setError(null);
    setContent([]);
    setChatHistory([]); // Reset chat on new chapter select

    try {
      const chapterContent = await getChapterContent(chapter, level, std);
      setContent(chapterContent);
      const newChatSession = startChatSession(chapter, std);
      setChatSession(newChatSession);
      setChatHistory([{
          role: 'model',
          parts: `I'm ready to help! Ask me anything about "${chapter}".`
      }]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
      setChatSession(null);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleSendMessage = async (message: string) => {
    if (!chatSession || isChatLoading || !message.trim()) return;

    setIsChatLoading(true);
    const userMessage: ChatMessage = { role: 'user', parts: message };
    setChatHistory(prev => [...prev, userMessage]);

    try {
        const response = await continueChat(chatSession, message);
        const modelMessage: ChatMessage = { role: 'model', parts: response };
        setChatHistory(prev => [...prev, modelMessage]);
    } catch (err) {
        const errorMessage: ChatMessage = { role: 'model', parts: "Sorry, I couldn't get a response. Please try again." };
        setChatHistory(prev => [...prev, errorMessage]);
    } finally {
        setIsChatLoading(false);
    }
  };


  const handleChapterSelect = (chapter: string) => {
    fetchContent(chapter, difficulty, standard);
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    if (selectedChapter) {
      fetchContent(selectedChapter, newDifficulty, standard);
    }
  };

  const handleStandardChange = (newStandard: Standard) => {
    setStandard(newStandard);
    setSelectedChapter(null);
    setContent([]);
    setError(null);
    setChatSession(null);
    setChatHistory([]);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 md:sticky md:top-24 self-start space-y-6">
            <StandardSelector
              standards={STANDARDS}
              selectedStandard={standard}
              onSelect={handleStandardChange}
              isLoading={isLoading}
            />
            <DifficultySelector
              selectedDifficulty={difficulty}
              onSelect={handleDifficultyChange}
              isLoading={isLoading}
            />
            <ChapterList
              chapters={CHAPTERS[standard]}
              selectedChapter={selectedChapter}
              onSelect={handleChapterSelect}
              isLoading={isLoading}
            />
          </aside>
          <section className="flex-1 min-w-0">
            <ContentDisplay
              isLoading={isLoading}
              error={error}
              content={content}
              selectedChapter={selectedChapter}
              chatHistory={chatHistory}
              isChatLoading={isChatLoading}
              onSendMessage={handleSendMessage}
            />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;