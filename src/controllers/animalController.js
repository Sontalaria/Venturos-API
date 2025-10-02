import { Animal } from '../models/index.js';

export const getAll = async (req, res) => {
  try {
    const animais = await Animal.findAll();
    res.json(animais);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
    res.json(animal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const novo = await Animal.create(req.body);
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
    await animal.update(req.body);
    res.json(animal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
    await animal.destroy();
    res.json({ message: 'Animal removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};