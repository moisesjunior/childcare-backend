const EventController = require('../controllers/EventController')
const authMiddleware = require('../middlewares/auth')

module.exports = app => {
    app.use(authMiddleware)

    app.get("/event/:id",
        EventController.visualizaEvento()
    )

    app.get("/event",
        EventController.listarEventos()
    )

    app.post("/event", 
        EventController.adicionaEvento()
    )

    app.put("/event/:id", 
        EventController.editaEvento()
    )

    app.delete("/event/:id",
        EventController.removeEvento()    
    )
}