import { getAllPedidosAdocao, getPedidoAdocaoById, insertPedidoAdocao, updatePedidoAdocao, removePedidoAdocao } from '../models/PedidoAdocao.js';

export const getAll = async (req, res) => {
  try {
    const pedidos = await getAllPedidosAdocao();
    const data = pedidos.map(pedido => ({
      id: pedido.id,
      tutor_id: pedido.usuarioId,
      animal_id: pedido.animalId,
      status: pedido.status,
      posicao_fila: pedido.posicao_fila,
      criado_em: pedido.created_at
    }));
    res.json({ data, total: data.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const pedido = await getPedidoAdocaoById(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
    // Verifica se já existe pedido para este tutor e animal
    const pedidosExistentes = await getAllPedidosAdocao();
    if (pedidosExistentes.some(p => p.usuarioId === usuarioId && p.animalId === animalId)) {
      return res.status(400).json({ erro: 'Este tutor já tem um pedido de adoção para este animal' });
    }
  try {
    const { usuarioId, animalId } = req.body;
    // Verifica se o usuário existe e tem formulário preenchido
    const usuario = await import('../models/Usuario.js').then(m => m.getUsuarioById(usuarioId));
    const animal = await import('../models/Animal.js').then(m => m.getAnimalById(animalId));
    if (!usuario || !animal) {
      return res.status(404).json({ erro: 'Tutor ou animal não encontrado' });
    }
    if (!usuario.questionarioId) {
      return res.status(400).json({ erro: 'O tutor ainda não respondeu o questionário obrigatório' });
    }

    // Organiza fila por ordem de chegada
    let pedidos = await getAllPedidosAdocao();
    const pedidosDoAnimal = pedidos.filter(p => p.animalId === animalId);
    const posicao_fila = pedidosDoAnimal.length + 1;

    const novoPedido = { ...req.body, posicao_fila };
    const novo = await insertPedidoAdocao(novoPedido);
    res.status(201).json(novo);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao registrar o pedido de adoção' });
  }
};

export const update = async (req, res) => {
  try {
    const pedido = await getPedidoAdocaoById(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });
    const atualizado = await updatePedidoAdocao(req.params.id, req.body);
    res.json(atualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const pedido = await getPedidoAdocaoById(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });
    await removePedidoAdocao(req.params.id);

    // Atualiza fila dos pedidos do mesmo animal
    let pedidos = await getAllPedidosAdocao();
    const pedidosDoAnimal = pedidos
      .filter(p => p.animalId === pedido.animalId)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    // Reorganiza posições
    for (let i = 0; i < pedidosDoAnimal.length; i++) {
      await updatePedidoAdocao(pedidosDoAnimal[i].id, { posicao_fila: i + 1 });
    }

    res.json({ message: 'Pedido removido com sucesso e fila atualizada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};