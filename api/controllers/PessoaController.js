// const database = require('../models')
// const Sequelize = require('sequelize')

const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices('Pessoas')

class PessoaController {
    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos()
            return res.status(200).json(pessoasAtivas)
        } catch (error) {
            return res.status(500).json(error.message)            
        }
    }


    static async pegaTodasAsPessoas(req, res) {
        try {
            // abaixo usamos o scope all ao inves do defaultScope
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)            
        }
    }

    static async pegaPessoaPorId(req, res) {
        try {
            const { id } = req.params

            const pessoa = await pessoasServices.pegaUmRegistro(id)
            return res.json(pessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    static async criarPessoa(req, res) {
        try {
            const dadosPessoa = req.body
            const pessoa = await pessoasServices.criaRegistro(dadosPessoa)
            return res.status(201).json(pessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    static async atualizarPessoa(req, res) {
        try {
            const { id } = req.params
            const novasInfos = req.body
            
            await pessoasServices.atualizaRegistro(novasInfos, id)

            const pessoaAtualizada = pessoasServices.pegaUmRegistro(id)

            return res.json(pessoaAtualizada)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    static async apagarPessoa(req, res) {
        try {
            const { id } = req.params
            await pessoasServices.apagaRegistro(id)
            return res.status(204).end()
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    static async restaurarPessoa(req, res) {
        try {
            // agora que implementamos o soft delete, temos que ter uma forma de restaurar itens deletados
            const { id } = req.params
            await pessoasServices.restauraPessoa(id)

            return res.json({ message: `Pessoa com id: ${id} foi restaurada`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    // controllers de matriculas:

    static async cancelarPessoa(req, res) {
        try {
            const { estudanteId } = req.params

            await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId))
            
            return res.json({ message: `Matrículas do estudante ${estudanteId} canceladas.`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController