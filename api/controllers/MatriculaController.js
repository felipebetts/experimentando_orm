const { MatriculasServices } = require('../services')
const matriculasServices = new MatriculasServices('Matriculas')

class MatriculaController {
    static async pegarMatriculaPorId (req, res) {
        try {
            const { estudanteId, matriculaId } = req.params
            const matricula = await matriculasServices.pegarMatriculaPorIds(estudanteId, matriculaId)
            return res.json(matricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criarMatricula(req, res) {
        try {
            const { estudanteId } = req.params
            const dadosMatricula = { ...req.body, estudante_id: Number(estudanteId)}
            const matricula = await matriculasServices.criaRegistro(dadosMatricula)
            return res.status(201).json(matricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizarMatricula(req, res) {
        try {
            const { estudanteId, matriculaId } = req.params
            const novasInfos = req.body
            
            await matriculasServices.atualizarMatricula(novasInfos, estudanteId, matriculaId)

            const matriculaAtualizada = await matriculasServices.pegaUmRegistro(matriculaId)

            return res.json(matriculaAtualizada)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagarMatricula(req, res) {
        try {
            const { estudanteId, matriculaId } = req.params
            await matriculasServices.apagaRegistro(matriculaId)
            return res.status(204).end()
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegarMatriculas(req, res) {
        try {
            const { estudanteId } = req.params
            const pessoa = await matriculasServices.pegaRegistros({ id: estudanteId })

            // abaixo utilizamos um mixin que foi criado quando nomeamos o escopo da association de matriculas e pessoas
            const matriculas = await pessoa.getAulasMatriculadas() // o nome da funcao e get + nome do escopo
            return res.json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegarMatriculasporTurma(req, res) {
        try {
            const { turmaId } = req.params
            
            const matriculas = await matriculasServices.pegarMatriculasporTurma(turmaId)
            
            return res.json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegarTurmasLotadas(req, res) {
        try {
            const lotacaoTurma = 3
            
            const turmasLotadas = await matriculasServices.pegarTurmasLotadas(lotacaoTurma)
            
            return res.json(turmasLotadas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = MatriculaController