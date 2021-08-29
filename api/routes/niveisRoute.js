const { Router } = require('express')
const NivelController = require('../controllers/NivelController')

const router = Router()
router
 .get('/niveis', NivelController.pegaTodosOsNiveis)
 .get('/niveis/:id', NivelController.peganivelPorId)
 .post('/niveis', NivelController.criarnivel)
 .put('/niveis/:id', NivelController.atualizarnivel)
 .delete('/niveis/:id', NivelController.apagarnivel)
module.exports = router