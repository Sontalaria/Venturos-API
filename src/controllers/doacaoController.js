import { Doacao } from '../models/index.js';

export const getAll = async (req, res) => {
  try {
    const doacoes = await Doacao.findAll();
    res.json(doacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const doacao = await Doacao.findByPk(req.params.id);
    if (!doacao) return res.status(404).json({ error: 'Doação não encontrada' });
    res.json(doacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const nova = await Doacao.create(req.body);
    res.status(201).json(nova);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const doacao = await Doacao.findByPk(req.params.id);
    if (!doacao) return res.status(404).json({ error: 'Doação não encontrada' });
    await doacao.update(req.body);
    res.json(doacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const doacao = await Doacao.findByPk(req.params.id);
    if (!doacao) return res.status(404).json({ error: 'Doação não encontrada' });
    await doacao.destroy();
    res.json({ message: 'Doação removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
