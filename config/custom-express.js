// Única função do arquivo cusotm-express.js é configurar o servidor

const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const Cors = require('cors')
const passport = require('passport')
const logger = require('morgan')

require('../config/passport-config')

module.exports = () => {
    const app = express()

    app.use(Cors())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(passport.initialize())
    consign()
        .include('controllers')
        .into(app)
        // Consign agrupa todas as rotas presentes nos arquivos .js dentro da pasta controllers
        // e coloca todas dentro do objeto 'app'
    
    return(app)
}