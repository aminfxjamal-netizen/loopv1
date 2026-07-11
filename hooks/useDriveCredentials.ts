'use client'
import { useState, useEffect } from 'react'

interface DriveCredentials {
  email: string;
  appPassword: string;
}

export function useDriveCredentials() {
  const [credentials, setCredentials] = useState<DriveCredentials | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('loop_drive_credentials');
    if (stored) {
      try { const parsed = JSON.parse(stored); setCredentials(parsed); setIsConfigured(true); } catch {}
    }
  }, []);

  const saveCredentials = (email: string, appPassword: string) => {
    const creds: DriveCredentials = { email, appPassword };
    localStorage.setItem('loop_drive_credentials', JSON.stringify(creds));
    setCredentials(creds); setIsConfigured(true);
  };

  const removeCredentials = () => {
    localStorage.removeItem('loop_drive_credentials');
    setCredentials(null); setIsConfigured(false);
  };

  return { credentials, isConfigured, saveCredentials, removeCredentials };
}