const PatientController = require('../controllers/PatientController')
const authMiddleware = require('../middlewares/auth')

module.exports = app => {
    app.use(authMiddleware)

    app.get("/patient",
        PatientController.listarPaciente()
    )

    app.get("/patient/list",
        PatientController.listarPacienteToSelect()
    )

    app.get("/patient/:id",
        PatientController.visualizaPaciente()
    )

    app.get("/patient/doctor/:id",
        PatientController.listaPacientePorMedico()
    )

    app.post("/patient",
        PatientController.adicionaPaciente()
    )

    app.put("/patient/:id",
        PatientController.editaPaciente()
    )

    app.delete("/patient/:id",
        PatientController.removePaciente()
    )
}