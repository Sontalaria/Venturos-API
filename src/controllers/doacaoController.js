import { getAllDoacoes, getDoacaoById, insertDoacao, updateDoacao, removeDoacao } from '../models/Doacao.js';

export const getAll = async (req, res) => {
  try {
    const doacoes = await getAllDoacoes();
    res.json(doacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const doacao = await getDoacaoById(req.params.id);
    if (!doacao) return res.status(404).json({ error: 'Doação não encontrada' });
    res.json(doacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { doacao_id, nome, email, valor, mensagem, linkPix, qrcode } = req.body;
    if (!nome || !mensagem) {
      return res.status(400).json({ erro: 'Campos obrigatórios ausentes.' });
    }
    if (valor === undefined || isNaN(valor) || Number(valor) <= 0) {
      return res.status(400).json({ erro: 'Valor da doação é obrigatório e deve ser um número positivo' });
    }
    const payload = { nome, valor, mensagem };
    if (doacao_id) payload.id = doacao_id;
    if (email) payload.email = email;
    if (linkPix) payload.linkPix = linkPix;
    if (qrcode) payload.qrcode = qrcode;
    const nova = await insertDoacao(payload);
    res.status(201).json(nova);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao processar a doação' });
  }
};

export const update = async (req, res) => {
  try {
    const doacao = await getDoacaoById(req.params.id);
    if (!doacao) return res.status(404).json({ error: 'Doação não encontrada' });
    const atualizado = await updateDoacao(req.params.id, req.body);
    res.json(atualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const doacao = await getDoacaoById(req.params.id);
    if (!doacao) return res.status(404).json({ error: 'Doação não encontrada' });
    await removeDoacao(req.params.id);
    res.json({ message: 'Doação removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
