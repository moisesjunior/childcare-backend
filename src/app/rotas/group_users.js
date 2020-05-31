const authMiddleware = require('../middlewares/auth')
const GroupUsersController = require('../controllers/GroupUsersController')

module.exports = app => {
    app.use(authMiddleware)

    app.get("/grupo/:id", GroupUsersController.listaUsuariosPorTipo())
}