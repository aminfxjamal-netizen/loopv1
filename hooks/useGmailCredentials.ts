'use client'
import { useState, useEffect } from 'react'

interface GmailCredentials {
  email: string;
  appPassword: string;
}

export function useGmailCredentials() {
  const [credentials, setCredentials] = useState<GmailCredentials | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('loop_gmail_credentials');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCredentials(parsed);
        setIsConfigured(true);
      } catch {}
    }
  }, []);

  const saveCredentials = (email: string, appPassword: string) => {
    const creds: GmailCredentials = { email, appPassword };
    localStorage.setItem('loop_gmail_credentials', JSON.stringify(creds));
    setCredentials(creds);
    setIsConfigured(true);
  };

  const removeCredentials = () => {
    localStorage.removeItem('loop_gmail_credentials');
    setCredentials(null);
    setIsConfigured(false);
  };

  return { credentials, isConfigured, saveCredentials, removeCredentials };
}