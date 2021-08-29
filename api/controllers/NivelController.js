const database = require('../models')


//controllers/NivelController.js

class NivelController {

    static async pegaTodosOsNiveis(req, res) {
      try {
        const todosOsNiveis = await database.Niveis.findAll()
        return res.status(200).json(todosOsNiveis)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }
    

    static async peganivelPorId(req, res) {
      try {
          const { id } = req.params

          const nivel = await database.Niveis.findOne({
              where: {
                  id: Number(id)
              }
          })
          return res.json(nivel)
      } catch (error) {
          return res.status(500).json(error.message)
      }
  }
  
  static async criarnivel(req, res) {
      try {
          const dadosnivel = req.body
          const nivel = await database.Niveis.create(dadosnivel)
          return res.status(201).json(nivel)
      } catch (error) {
          return res.status(500).json(error.message)
      }
  }
  
  static async atualizarnivel(req, res) {
      try {
          const { id } = req.params
          const novasInfos = req.body
          
          await database.Niveis.update(novasInfos, {
              where: {
                  id: Number(id)
              }
          })

          const nivelAtualizada = await database.Niveis.findOne({
              where: {
                  id: Number(id)
              }
          })

          return res.json(nivelAtualizada)

      } catch (error) {
          return res.status(500).json(error.message)
      }
  }
  
  static async apagarnivel(req, res) {
      try {
          const { id } = req.params
          await database.Niveis.destroy({
              where: {
                  id: Number(id)
              }
          })
          return res.status(204).end()
      } catch (error) {
          return res.status(500).json(error.message)
      }
  }
}

module.exports = NivelController