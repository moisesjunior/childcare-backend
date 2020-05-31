// Responsável por exportar todas as configurações de rotas
const UserController = require('../controllers/UserController')
const authMiddleware = require('../middlewares/auth')

module.exports = app => {
    app.use(authMiddleware)

    app.get('/usuario/:id',
        UserController.buscarUsuario()
    );

    app.post('/usuario', 
        UserController.adicionarUsuario()
    );

    app.put('/usuario/:id',
        UserController.editarUsuario()
    );

    app.delete('/usuario/:id',
        UserController.removerUsuario()
    );
}