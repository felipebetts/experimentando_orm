// const database = require('../models')

const { NiveisServices } = require('../services')
const niveisServices = new NiveisServices('Niveis')


//controllers/NivelController.js

class NivelController {

    static async pegaTodosOsNiveis(req, res) {
      try {
        const todosOsNiveis = await niveisServices.pegaTodosOsRegistros()
        return res.status(200).json(todosOsNiveis)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }
    

    static async peganivelPorId(req, res) {
      try {
          const { id } = req.params

          const nivel = await niveisServices.pegaUmRegistro(id)
          return res.json(nivel)
      } catch (error) {
          return res.status(500).json(error.message)
      }
  }
  
  static async criarnivel(req, res) {
      try {
          const dadosnivel = req.body
          const nivel = await niveisServices.criaRegistro(dadosnivel)
          return res.status(201).json(nivel)
      } catch (error) {
          return res.status(500).json(error.message)
      }
  }
  
  static async atualizarnivel(req, res) {
      try {
          const { id } = req.params
          const novasInfos = req.body
          
          await niveisServices.atualizaRegistro(novasInfos, id)

          const nivelAtualizada = await niveisServices.pegaUmRegistro(id)

          return res.json(nivelAtualizada)

      } catch (error) {
          return res.status(500).json(error.message)
      }
  }
  
  static async apagarnivel(req, res) {
      try {
          const { id } = req.params
          await niveisServices.apagaRegistro(id)
          return res.status(204).end()
      } catch (error) {
          return res.status(500).json(error.message)
      }
  }
}

module.exports = NivelController