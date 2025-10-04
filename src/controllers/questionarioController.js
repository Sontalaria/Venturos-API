import { Questionario } from '../models/index.js';

export const getAll = async (req, res) => {
  try {
    const questionarios = await Questionario.findAll();
    res.json(questionarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const questionario = await Questionario.findByPk(req.params.id);
    if (!questionario) return res.status(404).json({ error: 'Questionário não encontrado' });
    res.json(questionario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const novo = await Questionario.create(req.body);
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const questionario = await Questionario.findByPk(req.params.id);
    if (!questionario) return res.status(404).json({ error: 'Questionário não encontrado' });
    await questionario.update(req.body);
    res.json(questionario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const questionario = await Questionario.findByPk(req.params.id);
    if (!questionario) return res.status(404).json({ error: 'Questionário não encontrado' });
    await questionario.destroy();
    res.json({ message: 'Questionário removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};