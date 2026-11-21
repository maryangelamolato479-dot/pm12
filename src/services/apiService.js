import { supabase } from '../lib/supabase';

export const fetchUsersFromApi = async () => {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const insertUserToApi = async ({ id, name, email, company }) => {
  const row = {
    name: name || null,
    email: email || null,
    company: company || null,
  };

  if (id !== undefined && id !== null && String(id).trim() !== '') {
    row.id = Number(id);
  }

  const { data, error } = await supabase
    .from('user')
    .insert([row])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};