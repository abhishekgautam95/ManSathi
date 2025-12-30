
export enum UserRole {
  PATIENT = 'PATIENT',
  THERAPIST = 'THERAPIST',
  ADMIN = 'ADMIN'
}

export enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface User {
  id: string;
  name: string;
  isAnonymous: boolean;
  role: UserRole;
  preferences?: {
    language: string;
    genderPreference?: string;
  };
}

export interface Psychologist extends User {
  licenseId: string;
  specialization: string[];
  bio: string;
  rating: number;
  pricePerSession: number;
  verified: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  sentiment?: 'positive' | 'neutral' | 'negative' | 'crisis';
}

export interface MoodEntry {
  date: string;
  score: number; // 1-10
  emotion: string;
}

export interface Session {
  id: string;
  patientId: string;
  therapistId: string;
  startTime: number;
  status: SessionStatus;
  summary?: string;
}
