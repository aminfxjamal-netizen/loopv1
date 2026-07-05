interface FollowUp {
  id: string;
  userId: string;
  recipientEmail: string;
  subject: string;
  sentDate: string;
  followUpDate: string;
  status: 'pending' | 'completed' | 'cancelled';
}

const STORAGE_KEY = 'loop_followups';

export function getFollowUps(): FollowUp[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addFollowUp(followUp: Omit<FollowUp, 'id'>): FollowUp {
  const followUps = getFollowUps();
  const newFollowUp: FollowUp = {
    ...followUp,
    id: Math.random().toString(36).substring(7)
  };
  followUps.push(newFollowUp);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(followUps));
  return newFollowUp;
}

export function getDueFollowUps(): FollowUp[] {
  const now = new Date();
  return getFollowUps().filter(f => 
    f.status === 'pending' && new Date(f.followUpDate) <= now
  );
}

export function markFollowUpComplete(id: string): void {
  const followUps = getFollowUps();
  const index = followUps.findIndex(f => f.id === id);
  if (index !== -1) {
    followUps[index].status = 'completed';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(followUps));
  }
}

export function cancelFollowUp(id: string): void {
  const followUps = getFollowUps();
  const index = followUps.findIndex(f => f.id === id);
  if (index !== -1) {
    followUps[index].status = 'cancelled';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(followUps));
  }
}

export function getPendingCount(): number {
  return getFollowUps().filter(f => f.status === 'pending').length;
}