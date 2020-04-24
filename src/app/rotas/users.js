// Responsável por exportar todas as configurações de rotas
const UserController = require('../controllers/UserController')

module.exports = app => {
    app.get('/usuarios',
        UserController.adicionaUsuario()
    );

    app.get('/usuarios/:id',
        UserController.adicionaUsuario()
    );

    app.post('/usuarios', 
        UserController.adicionaUsuario()
    );

    app.put('/usuarios/:id',
        UserController.adicionaUsuario()
    );

    app.delete('/usuarios/:id',
        UserController.adicionaUsuario()
    );
}