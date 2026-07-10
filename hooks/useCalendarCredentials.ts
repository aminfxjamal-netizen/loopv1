'use client'
import { useState, useEffect } from 'react'

interface CalendarCredentials {
  email: string;
  appPassword: string;
}

export function useCalendarCredentials() {
  const [credentials, setCredentials] = useState<CalendarCredentials | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('loop_calendar_credentials');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCredentials(parsed);
        setIsConfigured(true);
      } catch {}
    }
  }, []);

  const saveCredentials = (email: string, appPassword: string) => {
    const creds: CalendarCredentials = { email, appPassword };
    localStorage.setItem('loop_calendar_credentials', JSON.stringify(creds));
    setCredentials(creds);
    setIsConfigured(true);
  };

  const removeCredentials = () => {
    localStorage.removeItem('loop_calendar_credentials');
    setCredentials(null);
    setIsConfigured(false);
  };

  return { credentials, isConfigured, saveCredentials, removeCredentials };
}