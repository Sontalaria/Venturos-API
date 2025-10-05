import { getAllPedidosAdocao } from '../models/PedidoAdocao.js';

// GET /api/animais/:id/detalhes
export const getAnimalDetalhes = async (req, res) => {
  try {
    const animal = await getAnimalById(req.params.id);
  if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });

    let imagem = null;
    if (animal.foto) {
      if (Buffer.isBuffer(animal.foto)) {
        imagem = animal.foto.toString('base64');
      } else {
        imagem = animal.foto;
      }
    }

    // Buscar pedidos de adoção para este animal
    const pedidos = await getAllPedidosAdocao();
    const pedidosDoAnimal = pedidos
      .filter(p => p.animalId === animal.id)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    res.json({
      animal: {
        id: animal.id,
        nome: animal.nome,
        especie: animal.especie,
        porte: animal.porte,
        castrado: animal.castrado,
        vacinado: animal.vacinado,
        adotado: animal.adotado,
        descricao: animal.descricao,
        imagem,
        created_at: animal.created_at
      },
      pedidos: pedidosDoAnimal
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
import { getAllAnimals, getAnimalById, insertAnimal, updateAnimal, removeAnimal } from '../models/Animal.js';

export const getAll = async (req, res) => {
  try {
    if (!req.user || !req.user.administrador) {
      return res.status(403).json({ erro: 'Acesso não autorizado' });
    }
    let animais = await getAllAnimals();
    // Filtros: raca, idade, porte, castrado
    const { raca, idade, porte, castrado } = req.query;
    if (raca) {
      animais = animais.filter(a => a.raca && a.raca.toLowerCase() === raca.toLowerCase());
    }
    if (idade) {
      animais = animais.filter(a => a.idade && String(a.idade) === String(idade));
    }
    if (porte) {
      animais = animais.filter(a => a.porte && a.porte.toLowerCase() === porte.toLowerCase());
    }
    if (castrado !== undefined) {
      if (castrado === 'true' || castrado === true) {
        animais = animais.filter(a => a.castrado === true);
      } else if (castrado === 'false' || castrado === false) {
        animais = animais.filter(a => a.castrado === false);
      }
    }
    const data = animais.map(animal => {
      let imagem = null;
      if (animal.foto) {
        if (Buffer.isBuffer(animal.foto)) {
          imagem = animal.foto.toString('base64');
        } else {
          imagem = animal.foto;
        }
      }
      return {
        id: animal.id,
        nome: animal.nome,
        raca: animal.raca,
        idade: animal.idade,
        especie: animal.especie,
        porte: animal.porte,
        castrado: animal.castrado,
        vacinado: animal.vacinado,
        adotado: animal.adotado,
        descricao: animal.descricao,
        imagem,
        created_at: animal.created_at
      };
    });
    res.json({ data, total: data.length });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar animais' });
  }
};

export const getById = async (req, res) => {
  try {
    const animal = await getAnimalById(req.params.id);
  if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });
    res.json(animal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const {
      nome,
      especie,
      porte,
      castrado,
      vacinado,
      descricao,
      foto
    } = req.body;

    if (!nome || !especie || !porte || castrado === undefined || vacinado === undefined || !descricao) {
      return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos corretamente.' });
    }

    // foto pode ser base64 ou Buffer, depende do frontend
    const novo = await insertAnimal({
      nome,
      especie,
      porte,
      castrado,
      vacinado,
      descricao,
      foto
    });
    res.status(201).json(novo);
  } catch (error) {
  res.status(500).json({ erro: 'Erro interno ao cadastrar o animal.' });
  }
};

export const update = async (req, res) => {
  try {
    if (!req.user || !req.user.administrador) {
      return res.status(403).json({ erro: 'Acesso não autorizado' });
    }
    const animal = await getAnimalById(req.params.id);
  if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });

    const {
      nome,
      castrado,
      vacinado,
      adotado,
      descricao,
      updated_at
    } = req.body;

    const payload = {};
    if (nome !== undefined) payload.nome = nome;
    if (castrado !== undefined) payload.castrado = castrado;
    if (vacinado !== undefined) payload.vacinado = vacinado;
    if (adotado !== undefined) payload.adotado = adotado;
    if (descricao !== undefined) payload.descricao = descricao;
    if (updated_at !== undefined) payload.updated_at = updated_at;

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ erro: 'Nenhum campo foi fornecido para atualização' });
    }

    const atualizado = await updateAnimal(req.params.id, payload);
    res.json(atualizado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar o animal' });
  }
};

export const remove = async (req, res) => {
  try {
    if (!req.user || !req.user.administrador) {
      return res.status(403).json({ erro: 'Acesso não autorizado' });
    }
    const animal = await getAnimalById(req.params.id);
  if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });
    await removeAnimal(req.params.id);
    res.json({ message: 'Animal removido com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao remover animal' });
  }
};