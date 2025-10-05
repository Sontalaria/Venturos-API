import supabase from '../config/supabaseClient.js';

export async function getAllAnimals() {
    const { data, error } = await supabase.from('animals').select('*');
    if (error) throw error;
    return data;
}

export async function getAnimalById(id) {
    const { data, error } = await supabase.from('animals').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
}

export async function insertAnimal(payload) {
    const { data, error } = await supabase.from('animals').insert([payload]).select();
    if (error) throw error;
    return data;
}

export async function updateAnimal(id, payload) {
    const { data, error } = await supabase.from('animals').update(payload).eq('id', id).select();
    if (error) throw error;
    return data;
}

export async function removeAnimal(id) {
    const { data, error } = await supabase.from('animals').delete().eq('id', id).select();
    if (error) throw error;
    return data;
}
