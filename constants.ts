
import { Psychologist, MoodEntry, SessionStatus } from './types';

export const COLORS = {
  primary: '#0D9488', // Teal-600
  secondary: '#0F766E', // Teal-700
  accent: '#F97316', // Orange-500
  danger: '#DC2626', // Red-600
  background: '#F8FAFC',
};

export const MOCK_THERAPISTS: Psychologist[] = [
  {
    id: 't1',
    name: 'Dr. Ananya Sharma',
    role: 'THERAPIST' as any,
    isAnonymous: false,
    licenseId: 'MCI-9921',
    specialization: ['Anxiety', 'Depression', 'Trauma'],
    bio: 'Experienced clinical psychologist with 10+ years specializing in CBT and Mindfulness.',
    rating: 4.9,
    pricePerSession: 1500,
    verified: true,
  },
  {
    id: 't2',
    name: 'Dr. Rahul Verma',
    role: 'THERAPIST' as any,
    isAnonymous: false,
    licenseId: 'MCI-4452',
    specialization: ['Career Counseling', 'Relationship Stress'],
    bio: 'Passionate about helping young adults navigate life transitions and career growth.',
    rating: 4.7,
    pricePerSession: 1200,
    verified: true,
  }
];

export const MOCK_MOODS: MoodEntry[] = [
  { date: '2023-10-01', score: 4, emotion: 'Anxious' },
  { date: '2023-10-02', score: 6, emotion: 'Calm' },
  { date: '2023-10-03', score: 5, emotion: 'Tired' },
  { date: '2023-10-04', score: 8, emotion: 'Happy' },
  { date: '2023-10-05', score: 3, emotion: 'Overwhelmed' },
  { date: '2023-10-06', score: 7, emotion: 'Productive' },
  { date: '2023-10-07', score: 9, emotion: 'Joyful' },
];

export const AI_CONFIG = {
  SYSTEM_PROMPT: `You are MannSathi AI, a warm and supportive mental health companion for the Indian context. 
  Your name "MannSathi" means "Companion of the Mind".
  Your goals:
  1. Provide emotional support and grounding.
  2. Use English, Hindi, or Hinglish as per user preference.
  3. Detect distress and suggest professional help.
  4. ALWAYS show disclaimer: 'I am an AI, not a doctor.'
  5. CRITICAL: If you detect self-harm or suicidal intent, immediately flag it.`,
  
  SUMMARY_PROMPT: `Summarize this therapy session for a professional psychologist. 
  Focus on:
  1. Key emotional themes.
  2. Specific triggers mentioned.
  Keep it clinical and objective.`,
};
