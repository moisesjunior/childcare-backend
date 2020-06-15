const AppointmentController = require('../controllers/MedicalAppController')
const multer = require('multer');
const multerConfig = require('../../config/multer')
const authMiddleware = require('../middlewares/auth')

module.exports = app => {
    app.use(authMiddleware)

    app.get("/appointment",
        AppointmentController.listarConsulta()
    )

    app.get("/appointment/:id",
        AppointmentController.visualizaConsulta()
    )

    app.post("/appointment", multer(multerConfig).single('file'), (req, res) => {
        AppointmentController.adicionaConsulta(req, res)
    })

    app.get("/appointment/exames/:id", (req, res) => {
        AppointmentController.visualizaExames(req, res)
    })
}