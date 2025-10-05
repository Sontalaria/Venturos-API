import supabase from '../config/supabaseClient.js';

export async function getAllQuestionarios() {
  const { data, error } = await supabase.from('questionarios').select('*');
  if (error) throw error;
  return data;
}

export async function getQuestionarioById(id) {
  const { data, error } = await supabase.from('questionarios').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function insertQuestionario(payload) {
  const { data, error } = await supabase.from('questionarios').insert([payload]).select();
  if (error) throw error;
  return data;
}

export async function updateQuestionario(id, payload) {
  const { data, error } = await supabase.from('questionarios').update(payload).eq('id', id).select();
  if (error) throw error;
  return data;
}

export async function removeQuestionario(id) {
  const { data, error } = await supabase.from('questionarios').delete().eq('id', id).select();
  if (error) throw error;
  return data;
}
