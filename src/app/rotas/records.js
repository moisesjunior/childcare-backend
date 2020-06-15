const RecordsController = require('../controllers/RecordsController')
const authMiddleware = require('../middlewares/auth')

module.exports = app => {
    app.use(authMiddleware)

    app.get("/records",
        RecordsController.listarProntuario()
    )

    app.get("/records/:id",
        RecordsController.listarProntuarioPorPaciente()
    )
}