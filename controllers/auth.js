// Responsável por exportar todas as configurações de rotas
const Auth = require('../models/auth')

module.exports = app => {
    app.post('/login', 
        Auth.login()
    );
}