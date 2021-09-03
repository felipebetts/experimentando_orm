const express = require('express')
const pessoas = require('./pessoasRoute')
const niveis = require('./niveisRoute')
const turmas = require('./turmasRoute')
const matriculas = require('./matriculasRoute')

module.exports = app => {
    app.use(express.json())

    // app.get('/', (req, res) => res.send('boraa'))
    app.use('/', pessoas)
    app.use(niveis)
    app.use(turmas)
    app.use(matriculas)
}