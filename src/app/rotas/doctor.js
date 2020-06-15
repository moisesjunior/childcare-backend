const PatientController = require('../controllers/DoctorController')
const authMiddleware = require('../middlewares/auth')

module.exports = app => {
    app.use(authMiddleware)

    app.get("/doctor",
        PatientController.listarMedico()
    )

    app.get("/doctor/:id",
        PatientController.visualizaMedico()
    )

    app.post("/doctor",
        PatientController.adicionaMedico()
    )

    app.put("/doctor/:id",
        PatientController.editaMedico()
    )

    app.delete("/doctor/:id",
        PatientController.removeMedico()
    )
}