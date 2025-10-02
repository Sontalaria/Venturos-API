import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Questionario = sequelize.define('Questionario', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        respostas: {
            type: DataTypes.JSON,
            allowNull: false
        },
        usuarioId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        tableName: 'questionarios',
        timestamps: true
    });

    return Questionario;
};
