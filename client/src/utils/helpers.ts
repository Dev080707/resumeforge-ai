export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function isValidEmail(email: string): boolean {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidUrl(url: string): boolean {
  if (!url) return true;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

import { ResumeData } from "../types/resume";

export function calculateCompletion(data: ResumeData): number {
  const checks = [
    Boolean(data.personal.fullName),
    Boolean(data.personal.email),
    Boolean(data.personal.title),
    data.education.length > 0,
    data.experience.length > 0,
    data.projects.length > 0,
    Object.values(data.skills).some((arr) => arr.length > 0),
    data.achievements.length > 0,
  ];
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}

const STORAGE_KEY = "resumeforge:resume-data";

export function saveResumeToStorage(data: ResumeData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function loadResumeFromStorage(): ResumeData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ResumeData) : null;
  } catch {
    return null;
  }
}

export function clearResumeFromStorage() {
  localStorage.removeItem(STORAGE_KEY);
}
