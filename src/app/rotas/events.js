const EventController = require('../controllers/EventController')

module.exports = app => {
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