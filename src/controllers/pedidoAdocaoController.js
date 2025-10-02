import { PedidoAdocao } from '../models/index.js';

export const getAll = async (req, res) => {
  try {
    const pedidos = await PedidoAdocao.findAll();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const pedido = await PedidoAdocao.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const novo = await PedidoAdocao.create(req.body);
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const pedido = await PedidoAdocao.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });
    await pedido.update(req.body);
    res.json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const pedido = await PedidoAdocao.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });
    await pedido.destroy();
    res.json({ message: 'Pedido removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};