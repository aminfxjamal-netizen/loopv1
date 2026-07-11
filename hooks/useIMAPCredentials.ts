'use client'
import { useState, useEffect } from 'react'

interface IMAPCredentials {
  email: string;
  appPassword: string;
}

export function useIMAPCredentials() {
  const [credentials, setCredentials] = useState<IMAPCredentials | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('loop_imap_credentials');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCredentials(parsed);
        setIsConfigured(true);
      } catch {}
    }
  }, []);

  const saveCredentials = (email: string, appPassword: string) => {
    const creds: IMAPCredentials = { email, appPassword };
    localStorage.setItem('loop_imap_credentials', JSON.stringify(creds));
    setCredentials(creds);
    setIsConfigured(true);
  };

  const removeCredentials = () => {
    localStorage.removeItem('loop_imap_credentials');
    setCredentials(null);
    setIsConfigured(false);
  };

  return { credentials, isConfigured, saveCredentials, removeCredentials };
}