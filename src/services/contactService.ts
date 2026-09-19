import { supabase } from '@/lib/supabase';

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  responded: boolean;
  created_at: string;
}

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching contact messages:', error);
    throw new Error('No se pudieron cargar los mensajes.');
  }

  return data as ContactMessage[];
};

export const markMessageResponded = async (id: number, responded: boolean): Promise<void> => {
  const { error } = await supabase
    .from('contact_messages')
    .update({ responded })
    .eq('id', id);

  if (error) {
    console.error('Error updating message:', error);
    throw new Error('No se pudo actualizar el mensaje.');
  }
};