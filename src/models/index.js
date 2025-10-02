import { Sequelize } from 'sequelize';

import AnimalModel from './Animal.js';
import UsuarioModel from './Usuario.js';
import QuestionarioModel from './Questionario.js';
import PedidoAdocaoModel from './PedidoAdocao.js';
import DoacaoModel from './Doacao.js';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

export const Animal = AnimalModel(sequelize);
export const Usuario = UsuarioModel(sequelize);
export const Questionario = QuestionarioModel(sequelize);
export const PedidoAdocao = PedidoAdocaoModel(sequelize);
export const Doacao = DoacaoModel(sequelize);

Usuario.hasOne(Questionario, { foreignKey: 'usuarioId' });
Questionario.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(PedidoAdocao, { foreignKey: 'usuarioId' });
PedidoAdocao.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Animal.hasMany(PedidoAdocao, { foreignKey: 'animalId' });
PedidoAdocao.belongsTo(Animal, { foreignKey: 'animalId' });

await sequelize.sync();

export default { sequelize, Animal, Usuario, Questionario, PedidoAdocao, Doacao };