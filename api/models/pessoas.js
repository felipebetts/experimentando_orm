'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // definindo as relações entre tabelas:
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docente_id' // nome da coluna na tabela de turmas
      }) // many pessoas one turma

      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope: { status: 'confirmado'}, // definindo escopo para essa relacao
        as: 'aulasMatriculadas' // definindo o nome do escopo definido na linha acima
      }) // many pessoas one matricula
    }
  };
  Pessoas.init({
    nome: { 
      type: DataTypes.STRING,
      validate: {
        // e possivel criar funcoes de validacao customizadas aqui:
        funcaoValidadora: function(dado) {
          if (dado.length < 3) {
            throw new Error('nome deve ter mais de 3 caracteres')
          }
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      // ao definir dessa forma, podemos validar dados usando o sequelize
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'email invalido' // definindo mensagem customizada para erro desse tipo
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    defaultScope: {
      // aqui definimos o escopo padrao deste model
      // nesse caso, a condicao de ter a coluna ativo com valor true sera adicionada por padrao em todas as queries
      where: {
        ativo: true
      }
    },
    scopes: {
      // 'e possivel definir outros escopos alem do escopo padrao
      all : { where: {}}, // o escopo "all" lista todos os itens, sem restringir por ativo
    },
    modelName: 'Pessoas',
  });
  return Pessoas;
};