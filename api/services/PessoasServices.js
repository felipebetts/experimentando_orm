const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services {
    constructor() {
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }
    // metodos para o controlador de pessoas

    async pegaRegistrosAtivos(where = {}) {
        return database[this.nomeDoModelo].findAll({ where: { ...where }})
    }

    async pegaTodosOsRegistros(where = {}) {
        return database[this.nomeDoModelo]
            .scope('all')
            .findAll({ where: { ...where }})
    }

    async cancelaPessoaEMatriculas(estudanteId) {
        // colocamos os updates em uma transaction para evitar a sobrescrição de dadosd
        return database.sequelize.transaction(async transaction => {
            await super.atualizaRegistro({ ativo: false }, estudanteId, { transaction })
            await this.matriculas.atualizaRegistros({ status: 'cancelado' }, { estudante_id: estudanteId }, { transaction })
        })
    }

    async restauraPessoa(id) {
        return database[this.nomeDoModelo].restore({
            where: {
                id: Number(id)
            }
        })
    }
}

module.exports = PessoasServices