import { getAllQuestionarios, getQuestionarioById, insertQuestionario, updateQuestionario, removeQuestionario } from '../models/Questionario.js';

export const getAll = async (req, res) => {
  try {
    const questionarios = await getAllQuestionarios();
    res.json(questionarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const questionario = await getQuestionarioById(req.params.id);
    if (!questionario) return res.status(404).json({ error: 'Questionário não encontrado' });
    res.json(questionario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const requiredFields = [
      'empregado', 'quantos_animais_possui', 'motivos_para_adotar', 'quem_vai_sustentar_o_animal',
      'numero_adultos_na_casa', 'numero_criancas_na_casa', 'idades_criancas', 'residencia_tipo',
      'proprietario_permite_animais', 'todos_de_acordo_com_adocao', 'responsavel_pelo_animal',
      'responsavel_concorda_com_adocao', 'ha_alergico_ou_pessoas_que_nao_gostam', 'gasto_mensal_estimado',
      'valor_disponivel_no_orcamento', 'tipo_alimentacao', 'local_que_o_animal_vai_ficar', 'forma_de_permanencia',
      'forma_de_confinamento', 'tera_brinquedos', 'tera_abrigo', 'tera_passeios_acompanhado', 'tera_passeios_sozinho',
      'companhia_outro_animal', 'companhia_humana_24h', 'companhia_humana_parcial', 'sem_companhia_humana',
      'sem_companhia_animal', 'o_que_faz_em_viagem', 'o_que_faz_se_fugir', 'o_que_faz_se_nao_puder_criar',
      'animais_que_ja_criou', 'destino_animais_anteriores', 'costuma_esterilizar', 'costuma_vacinar',
      'costuma_vermifugar', 'veterinario_usual', 'forma_de_educar', 'envia_fotos_e_videos_do_local',
      'aceita_visitas_e_fotos_do_animal', 'topa_entrar_grupo_adotantes', 'concorda_com_taxa_adocao',
      'data_disponivel_para_buscar_animal'
    ];

    for (const field of requiredFields) {
      if (!(field in req.body)) {
        return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos corretamente.' });
      }
    }

    const novo = await insertQuestionario(req.body);
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const questionario = await getQuestionarioById(req.params.id);
    if (!questionario) return res.status(404).json({ error: 'Questionário não encontrado' });
    const atualizado = await updateQuestionario(req.params.id, req.body);
    res.json(atualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const questionario = await getQuestionarioById(req.params.id);
    if (!questionario) return res.status(404).json({ error: 'Questionário não encontrado' });
    await removeQuestionario(req.params.id);
    res.json({ message: 'Questionário removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};