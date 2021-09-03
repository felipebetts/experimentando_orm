const database = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const { TurmasServices } = require('../services')
const turmasServices = new TurmasServices()

// controllers/TurmaController.js

class TurmaController {

    static async pegaTodasAsTurmas(req, res) {
        const { data_inicial, data_final } = req.query
        const where = {}
        // nas 3 linhas abaixo configuramos o objeto de where de acordo com a query string recebida:
        data_inicial || data_final ? where.data_inicio = {} : null
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
        data_final ? where.data_inicio[Op.lte] = data_final : null

        // um objeto com ambas as query strings ficaria assim:
        // where: {
        //     data_inicio: {
        //         [Op.gte]: algumaData,
        //         [Op.lte]: outraData
        //     }
        // }

        try {
            const todasAsTurmas = await turmasServices.pegaRegistros({ ...where })
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }



    static async pegaTurmaPorId(req, res) {
        try {
            const { id } = req.params

            const Turma = await turmasServices.pegaUmRegistro(id)
            return res.json(Turma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criarTurma(req, res) {
        try {
            const dadosTurma = req.body
            const Turma = await turmasServices.criaRegistro(dadosTurma)
            return res.status(201).json(Turma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizarTurma(req, res) {
        try {
            const { id } = req.params
            const novasInfos = req.body

            await turmasServices.atualizaRegistro(novasInfos, id)

            const TurmaAtualizada = await turmasServices.pegaUmRegistro(id)

            return res.json(TurmaAtualizada)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagarTurma(req, res) {
        try {
            const { id } = req.params
            await turmasServices.apagaRegistro(id)
            return res.status(204).end()
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //etc
}

module.exports = TurmaController