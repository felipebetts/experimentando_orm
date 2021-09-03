const { Router } = require('express')
const MatriculaController = require('../controllers/MatriculaController')

const router = Router()

// rotas de matriculas: 
router.get('/pessoas/:estudanteId/matriculas', MatriculaController.pegarMatriculas)
router.get('/pessoas/:estudanteId/matriculas/:matriculaId', MatriculaController.pegarMatriculaPorId)
router.get('/pessoas/matriculas/:turmaId/confirmadas', MatriculaController.pegarMatriculasporTurma)
router.get('/pessoas/matriculas/lotadas', MatriculaController.pegarTurmasLotadas)
router.post('/pessoas/:estudanteId/matriculas', MatriculaController.criarMatricula)
router.put('/pessoas/:estudanteId/matriculas/:matriculaId', MatriculaController.atualizarMatricula)

module.exports = router