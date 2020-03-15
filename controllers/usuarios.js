// Responsável por exportar todas as configurações de rotas
const Usuario = require('../models/usuarios')
const bcrypt = require('bcrypt')
const passport = require('passport')

const authenticate = require('../config/passport-config')

module.exports = app => {
    app.get('/usuarios', (req, res) => res.send('Tudo OK na rota de usuários'))

    app.get('/', (req, res) => res.send('Tudo errado na rota de login'))

    app.get('/app', (req, res) => res.send('Tudo OK na autenticação'))

    app.post('/usuarios', (req, res) => {        
        const usuario = req.body 
        Usuario.adiciona(usuario, res)
    });

    app.post('/usuarios', (req, res) => {        
        const usuario = req.body
        
        Usuario.adiciona(usuario, res)
    });

    app.post('/login', 
        Usuario.login(), passport.authenticate('local', { successRedirect: '/',
                        failureRedirect: '/login',
                        failureFlash: true })
    );
}