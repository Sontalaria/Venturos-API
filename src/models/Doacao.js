import supabase from '../config/supabaseClient.js';

export async function getAllDoacoes() {
  const { data, error } = await supabase.from('doacoes').select('*');
  if (error) throw error;
  return data;
}

export async function getDoacaoById(id) {
  const { data, error } = await supabase.from('doacoes').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function insertDoacao(payload) {
  const { data, error } = await supabase.from('doacoes').insert([payload]).select();
  if (error) throw error;
  return data;
}

export async function updateDoacao(id, payload) {
  const { data, error } = await supabase.from('doacoes').update(payload).eq('id', id).select();
  if (error) throw error;
  return data;
}

export async function removeDoacao(id) {
  const { data, error } = await supabase.from('doacoes').delete().eq('id', id).select();
  if (error) throw error;
  return data;
}
