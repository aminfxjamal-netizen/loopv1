import { supabase } from './supabase';

export async function getOrCreateUser(name: string, email: string) {
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) return existingUser;

  const { data: newUser, error } = await supabase
    .from('users')
    .insert([{
      name,
      email,
      password: '',
      plan: 'trial',
      trial_start: new Date().toISOString(),
      trial_end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
    }])
    .select('id')
    .single();

  if (error) throw error;
  return newUser;
}

export async function createConversation(userId: string, title: string) {
  const { data, error } = await supabase
    .from('conversations')
    .insert([{ user_id: userId, title }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getConversations(userId: string) {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getMessages(conversationId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function saveMessage(
  conversationId: string,
  role: 'user' | 'assistant',
  content: string,
  isDraft = false,
  recipient?: string,
  subject?: string
) {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ 
      conversation_id: conversationId, 
      role, 
      content, 
      is_draft: isDraft, 
      recipient: recipient || null, 
      subject: subject || null 
    }])
    .select()
    .single();

  if (error) throw error;

  await supabase
    .from('conversations')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', conversationId);

  return data;
}

export async function deleteConversation(conversationId: string) {
  const { error } = await supabase
    .from('conversations')
    .delete()
    .eq('id', conversationId);

  if (error) throw error;
}