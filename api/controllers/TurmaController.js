const database = require('../models')


// controllers/TurmaController.js

class TurmaController {

    static async pegaTodasAsTurmas(req, res) {
      try {
        const todasAsTurmas = await database.Turmas.findAll()
        return res.status(200).json(todasAsTurmas)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async pegaTurmaPorId(req, res) {
      try {
          const { id } = req.params

          const Turma = await database.Turmas.findOne({
              where: {
                  id: Number(id)
              }
          })
          return res.json(Turma)
      } catch (error) {
          return res.status(500).json(error.message)
      }
  }
  
  static async criarTurma(req, res) {
      try {
          const dadosTurma = req.body
          const Turma = await database.Turmas.create(dadosTurma)
          return res.status(201).json(Turma)
      } catch (error) {
          return res.status(500).json(error.message)
      }
  }
  
  static async atualizarTurma(req, res) {
      try {
          const { id } = req.params
          const novasInfos = req.body
          
          await database.Turmas.update(novasInfos, {
              where: {
                  id: Number(id)
              }
          })

          const TurmaAtualizada = await database.Turmas.findOne({
              where: {
                  id: Number(id)
              }
          })

          return res.json(TurmaAtualizada)

      } catch (error) {
          return res.status(500).json(error.message)
      }
  }
  
  static async apagarTurma(req, res) {
      try {
          const { id } = req.params
          await database.Turmas.destroy({
              where: {
                  id: Number(id)
              }
          })
          return res.status(204).end()
      } catch (error) {
          return res.status(500).json(error.message)
      }
  }
    //etc
}

module.exports = TurmaController