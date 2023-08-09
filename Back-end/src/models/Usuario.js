import { DataTypes, Model } from "sequelize";
import bcrypt from "bcryptjs/dist/bcrypt.js";

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

                senha_virtual: {
                    type: DataTypes.VIRTUAL(255),
                    allowNull: false,
                }, 

                senha_hash: {
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

        this.addHook("beforeSave", async Usuario => {
            if(Usuario.senha_virtual) {
                Usuario.senha_hash = await bcrypt.hash(Usuario.senha_virtual, 8);
                console.log(Usuario.senha_hash);
            };
        });

        return this;
    };

    static associate(models) {
        this.belongsTo(models.Curso, { foreignKey: 'curso'});
        this.belongsTo(models.Turma, { foreignKey: 'turma'});
        this.hasMany(models.Prova, { foreignKey: 'usuario' });
    };

};

export default Usuario;