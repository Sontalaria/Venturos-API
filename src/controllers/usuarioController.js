// Login usuário comum: POST /api/usuarios/login
import { getAllUsuarios } from '../models/Usuario.js';

export const login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }
  try {
    const usuarios = await getAllUsuarios();
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (!usuario) {
      return res.status(401).json({ erro: 'Email ou senha inválidos.' });
    }
    // Não retorna a senha
    const { senha: _, ...usuarioSemSenha } = usuario;
    return res.json(usuarioSemSenha);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao tentar fazer o login.' });
  }
};
// Login admin: POST /api/login-admin
export const loginAdmin = async (req, res) => {
  const { email, senha } = req.body;
  if (email === 'Kpivarias@poio.com' && senha === '1687') {
    // Retorna status de admin (pode ser um token ou objeto)
    return res.json({ administrador: true, token: 'admin-token' });
  }
  return res.status(401).json({ erro: 'Email ou senha inválidos.' });
}

export const getAll = async (req, res) => {
  try {
    const usuarios = await getAllUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ...existing code...

export const getById = async (req, res) => {
  try {
    const usuario = await getUsuarioById(req.params.id);
  if (!usuario) return res.status(404).json({ erro: 'Tutor não encontrado' });

    let questionario = null;
    if (usuario.questionarioId) {
      questionario = await getQuestionarioById(usuario.questionarioId);
    }

    res.json({
      id: usuario.id,
      nome_completo: usuario.nome_completo,
      rg: usuario.rg,
      endereco: usuario.endereco,
      bairro: usuario.bairro,
      cidade: usuario.cidade,
      estado: usuario.estado,
      celular: usuario.celular,
      telefone: usuario.telefone,
      email: usuario.email,
      instagram: usuario.instagram,
      facebook: usuario.facebook,
      questionario
    });
  } catch (error) {
    res.status(500).json({ erro:'Erro ao buscar dados do tutor' });
  }
};

export const create = async (req, res) => {
  try {
    const {
      nome_completo,
      senha,
      email,
      cidade,
      estado,
      idade,
      telefone,
      instagram,
      facebook
    } = req.body;

    if (!nome_completo || !senha || !email || !cidade || !estado || idade === undefined || !telefone) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos corretamente.' });
    }

    // Verifica se o email já está cadastrado
    const usuarios = await getAllUsuarios();
    if (usuarios.some(u => u.email === email)) {
      return res.status(400).json({ error: 'Email preenchido já está sendo utilizado.' });
    }

    const novo = await insertUsuario({
      nome_completo,
      senha,
      email,
      cidade,
      estado,
      idade,
      telefone,
      instagram,
      facebook
    });
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

import { getQuestionarioById, insertQuestionario, updateQuestionario } from '../models/Questionario.js';

export const update = async (req, res) => {
  try {
    const usuario = await getUsuarioById(req.params.id);
  if (!usuario) return res.status(404).json({ erro: 'Tutor não encontrado' });

    const {
      nome_completo,
      email,
      cidade,
      estado,
      questionario
    } = req.body;

    // Verifica se pelo menos um campo foi enviado
    const camposEnviados = [nome_completo, email, cidade, estado, questionario].filter(v => v !== undefined);
    if (camposEnviados.length === 0) {
      return res.status(400).json({ erro: 'Pelo menos um campo deve ser enviado para atualização' });
    }

    // Atualiza dados do usuário
    const atualizado = await updateUsuario(req.params.id, {
      nome_completo,
      email,
      cidade,
      estado
    });

    // Atualiza ou cria questionário vinculado ao usuário
    let questionarioAtualizado = null;
    if (questionario) {
      // Busca questionário existente
      let existente = null;
      if (usuario.questionarioId) {
        existente = await getQuestionarioById(usuario.questionarioId);
      }
      if (existente) {
        questionarioAtualizado = await updateQuestionario(existente.id, questionario);
      } else {
        // Cria novo questionário e vincula ao usuário
        questionario.usuarioId = usuario.id;
        questionarioAtualizado = await insertQuestionario(questionario);
      }
    }

    res.json({ usuario: atualizado, questionario: questionarioAtualizado });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar os dados do tutor' });
  }
};

export const remove = async (req, res) => {
  try {
    const usuario = await getUsuarioById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    await removeUsuario(req.params.id);
    res.json({ message: 'Usuário removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

