const database = require('../models')

class PessoaController {
    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)            
        }
    }

    static async pegaPessoaPorId(req, res) {
        try {
            const { id } = req.params

            const pessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.json(pessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    static async criarPessoa(req, res) {
        try {
            const dadosPessoa = req.body
            const pessoa = await database.Pessoas.create(dadosPessoa)
            return res.status(201).json(pessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    static async atualizarPessoa(req, res) {
        try {
            const { id } = req.params
            const novasInfos = req.body
            
            await database.Pessoas.update(novasInfos, {
                where: {
                    id: Number(id)
                }
            })

            const pessoaAtualizada = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })

            return res.json(pessoaAtualizada)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    static async apagarPessoa(req, res) {
        try {
            const { id } = req.params
            await database.Pessoas.destroy({
                where: {
                    id: Number(id)
                }
            })
            return res.status(204).end()
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegarMatriculaPorId (req, res) {
        try {
            const { estudanteId, matriculaId } = req.params
            const matricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })

            return res.json(matricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criarMatricula(req, res) {
        try {
            const { estudanteId } = req.params
            const dadosMatricula = { ...req.body, estudante_id: Number(estudanteId)}
            const matricula = await database.Matriculas.create(dadosMatricula)
            return res.status(201).json(matricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizarMatricula(req, res) {
        try {
            const { estudanteId, matriculaId } = req.params
            const novasInfos = req.body
            
            await database.Matriculas.update(novasInfos, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })

            const matriculaAtualizada = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId)
                }
            })

            return res.json(matriculaAtualizada)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagarMatricula(req, res) {
        try {
            const { estudanteId, matriculaId } = req.params
            await database.Matriculas.destroy({
                where: {
                    id: Number(matriculaId)
                }
            })
            return res.status(204).end()
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController