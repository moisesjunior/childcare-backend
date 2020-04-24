// Responsável por exportar todas as configurações de rotas
const AuthController = require('../controllers/AuthController')

module.exports = app => {
    app.post('/login', 
        AuthController.login()
    );
}