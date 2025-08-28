import { STANDARDS } from './constants';
import type { Chat } from '@google/genai';

export interface QuestionAnswer {
  question: string;
  answerSteps: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: string;
}

export type Difficulty = 'simple' | 'detailed';
export type Standard = (typeof STANDARDS)[number];
export type ChatSession = Chat;