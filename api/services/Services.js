const database = require('../models')

class Services {
    constructor (nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodosOsRegistros() {
        return database[this.nomeDoModelo].findAll()
    }

    async pegaUmRegistro(id) {
        return database[this.nomeDoModelo].findOne({
            where: {
                id: Number(id)
            }
        })
    }

    async pegaRegistros(where = {}) {
        return database[this.nomeDoModelo].findOne({
            where: {
                ...where
            }
        })
    }

    async criaRegistro(dados) {
        return database[this.nomeDoModelo].create(dados)
    }

    async atualizaRegistro(dadosAtualizados, id, transaction = {}) {
        return database[this.nomeDoModelo]
            .update(dadosAtualizados, { where: { id }}, transaction)
    }

    async atualizaRegistros(dadosAtualizados, where, transaction = {}) {
        return database[this.nomeDoModelo]
            .update(dadosAtualizados, { where: { ...where }}, transaction)
    }

    async apagaRegistro(id) {
        return database[this.nomeDoModelo].destroy({
            where: {
                id: Number(id)
            }
        })
    }
}

module.exports = Services