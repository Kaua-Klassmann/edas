import { DataTypes, Model } from "sequelize";

class Usuario extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },

                nome: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },

                email: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    unique: true,
                },

                senha: {
                    type: DataTypes.STRING(255),
                    allowNull: false,

                }, 

                ano: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                               
            },
            {
                sequelize,
            }
        );


        return this;
    }

    static associate(models) {
        this.belongsTo(models.Curso, { foreignKey: 'curso'});
        this.belongsTo(models.Turma, { foreignKey: 'turma'});
        this.hasMany(models.Prova, { foreignKey: 'usuario' });
    }

}

export default Usuario;