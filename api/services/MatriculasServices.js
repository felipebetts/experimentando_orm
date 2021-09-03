const Services = require('./Services')

class MatriculasServices extends Services {
    constructor() {
        super('Matriculas')
    }
    // metodos para o controlador de Matriculas

    async pegarMatriculaPorIds(estudanteId, matriculaId) {
        return database[this.nomeDoModelo].findOne({
            where: {
                id: Number(matriculaId),
                estudante_id: Number(estudanteId)
            }
        })
    }

    async atualizarMatricula(dadosAtualizados, estudanteId, matriculaId) {
        return database[this.nomeDoModelo].update(dadosAtualizados, {
            where: {
                id: Number(matriculaId),
                estudante_id: Number(estudanteId)
            }
        })
    }

    async pegarMatriculasporTurma(turmaId) {
        return database[this.nomeDoModelo]
        .findAndCountAll({
            where: {
                turma_id: Number(turmaId),
                status: 'confirmado'
            },
            limit: 20,
            order: [['estudante_id', 'DESC']]
        })
    }

    async pegarTurmasLotadas(lotacaoTurma) {
        return database[this.nomeDoModelo]
        .findAndCountAll({
            where: {
                status: 'confirmado'
            },
            attributes: ['turma_id'],
            group: ['turma_id'],
            having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`) // a funcao Sequelize.literal() permite escrever sql customizado
        })
    }
}

module.exports = MatriculasServices