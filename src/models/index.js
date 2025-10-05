







import supabase from '../config/supabaseClient.js';

// Funções utilitárias para acesso aos dados via Supabase
export async function getAll(table) {
  const { data, error } = await supabase.from(table).select('*');
  if (error) throw error;
  return data;
}

export async function getById(table, id) {
  const { data, error } = await supabase.from(table).select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function insert(table, payload) {
  const { data, error } = await supabase.from(table).insert([payload]).select();
  if (error) throw error;
  return data;
}

export async function update(table, id, payload) {
  const { data, error } = await supabase.from(table).update(payload).eq('id', id).select();
  if (error) throw error;
  return data;
}

export async function remove(table, id) {
  const { data, error } = await supabase.from(table).delete().eq('id', id).select();
  if (error) throw error;
  return data;
}

export default { getAll, getById, insert, update, remove };