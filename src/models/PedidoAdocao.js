import supabase from '../config/supabaseClient.js';

export async function getAllPedidosAdocao() {
  const { data, error } = await supabase.from('pedidos_adocao').select('*');
  if (error) throw error;
  return data;
}

export async function getPedidoAdocaoById(id) {
  const { data, error } = await supabase.from('pedidos_adocao').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function insertPedidoAdocao(payload) {
  const { data, error } = await supabase.from('pedidos_adocao').insert([payload]).select();
  if (error) throw error;
  return data;
}

export async function updatePedidoAdocao(id, payload) {
  const { data, error } = await supabase.from('pedidos_adocao').update(payload).eq('id', id).select();
  if (error) throw error;
  return data;
}

export async function removePedidoAdocao(id) {
  const { data, error } = await supabase.from('pedidos_adocao').delete().eq('id', id).select();
  if (error) throw error;
  return data;
}
