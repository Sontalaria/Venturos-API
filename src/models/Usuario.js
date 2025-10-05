import supabase from '../config/supabaseClient.js';

export async function getAllUsuarios() {
  const { data, error } = await supabase.from('usuarios').select('*');
  if (error) throw error;
  return data;
}

export async function getUsuarioById(id) {
  const { data, error } = await supabase.from('usuarios').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function insertUsuario(payload) {
  const { data, error } = await supabase.from('usuarios').insert([payload]).select();
  if (error) throw error;
  return data;
}

export async function updateUsuario(id, payload) {
  const { data, error } = await supabase.from('usuarios').update(payload).eq('id', id).select();
  if (error) throw error;
  return data;
}

export async function removeUsuario(id) {
  const { data, error } = await supabase.from('usuarios').delete().eq('id', id).select();
  if (error) throw error;
  return data;
}
