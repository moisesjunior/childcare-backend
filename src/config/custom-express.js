require("dotenv").config()

const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const logger = require('morgan')

require('./passport-config')

module.exports = () => {
    const app = express()

    app.use(cors())
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", '*');
        res.header("Access-Control-Allow-Credentials", true);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
        next();
    })
    app.use(express.json())
    app.use(passport.initialize())
    app.use(passport.session())
    consign()
        .include('/src/app/rotas')
        .into(app)
    // Consign agrupa todas as rotas presentes nos arquivos .js dentro da pasta rotas
    // e coloca todas dentro do objeto 'app'

    return (app)
}